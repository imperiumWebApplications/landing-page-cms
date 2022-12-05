import { strapi } from '../instance';
import { CONTENT_TYPES, LandingPage, CollectionType } from '../model';

export const getLandingPage = async (domain: string) => {
  const res = await strapi.find<CollectionType<LandingPage>>(
    CONTENT_TYPES.LANDING_PAGES,
    {
      filters: {
        domain: {
          $eq: domain,
        },
      },
      populate: {
        sections: {
          populate: {
            background_image: { populate: '*' },
            number: { populate: '*' },
            images: { populate: '*' },
            faq_item: { populate: '*' },
            rating: { populate: { avatar: { populate: '*' } } },
            service_tab: {
              populate: { service_images: { populate: '*' } },
            },
          },
        },
        logo: { fields: '*' },
        favicon: { fields: '*' },
        tracking: { fields: '*' },
        questionnaire: {
          fields: '*',
          populate: {
            advantage: { fields: '*' },
            questionnaires: { fields: '*', populate: ['icon'] },
          },
        },
        appointment: {
          fields: '*',
          populate: {
            appointment_availability: { fields: '*' },
            appointment_location: { fields: '*' },
          },
        },
      },
    },
  );

  if (!res.data?.length) throw new Error('No site found for domain: ' + domain);

  return res.data[0];
};

export const getLandingPageId = async (domain: string) => {
  const res = await strapi.find<CollectionType<LandingPage>>(
    CONTENT_TYPES.LANDING_PAGES,
    {
      filters: {
        domain: {
          $eq: domain,
        },
      },
    },
  );

  if (!res.data.length) throw new Error('No site found for domain: ' + domain);

  return res.data[0].id;
};