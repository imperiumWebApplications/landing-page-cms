import styled, { useTheme } from 'styled-components';
import { ArrowRightCircleFill } from 'styled-icons/bootstrap';
import ReactMarkdown from 'react-markdown';
import dynamic from 'next/dynamic';

import type { ButtonProps } from '../../../components/Button';
import { Animation } from '../../../components/Animation';
import { startQuestionnaire } from '../../../config/navigation.config';
import { devices } from '../../../config/breakpoints.config';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

import { SectionContainer } from '../SectionContainer';
import { CallToActionSectionContent } from '../SectionMapper';

const ClientSideOnlyButton = dynamic<ButtonProps>(
  () => import('../../../components/Button').then((mod) => mod.Button),
  { ssr: false },
);

const StyledCallToActionSection = styled(SectionContainer)`
  overflow-x: hidden;

  & > .content-wrapper {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .service-description {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 100%;
    column-gap: 3rem;

    @media screen and (${devices.md}) {
      grid-template-rows: 100%;
      grid-template-columns: 1fr 1fr;
    }

    .intro {
      margin-bottom: 1rem;

      @media screen and (${devices.md}) {
        border-right: 4px dashed ${({ theme }) => theme.colors.tertiary};
        margin-bottom: 0;

        p {
          width: 80%;
        }
      }

      h2 {
        margin-bottom: 1rem;
        padding-right: 1rem;
      }
    }

    .description ul {
      margin-left: 1.25rem;
      text-indent: -1.25rem;

      li {
        line-height: 1.5rem;
      }

      li::before {
        content: '';
        background-color: ${({ theme }) => theme.colors.secondary};
        border-radius: 40% 60% 70% 30% / 40% 40% 60% 50%;
        display: inline-block;
        margin-right: 0.625rem;
        height: 0.625rem;
        width: 0.625rem;
      }
    }
  }

  .call-to-action-box {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    column-gap: 2rem;
    min-height: 8rem;
    max-width: 70rem;
    margin-top: 2rem;
    padding: 3rem 1.5rem;
    background-color: #f8f8f8;
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 4px dashed ${({ theme }) => theme.colors.tertiary};

    @media screen and (${devices.md}) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      column-gap: 2rem;
      padding: 3rem 2rem;
      margin-top: 3rem;
    }

    @media screen and (${devices.xl}) {
      &::before {
        content: '';
        position: absolute;
        top: 10px;
        left: -105%;
        height: 90%;
        width: 100%;
        opacity: 0.5;
        border-radius: ${({ theme }) => theme.borderRadius};
        background-color: ${({ theme }) => theme.colors.tertiary};
      }

      &::after {
        content: '';
        position: absolute;
        top: 10px;
        right: -105%;
        height: 90%;
        width: 100%;
        opacity: 0.5;
        border-radius: ${({ theme }) => theme.borderRadius};
        background-color: ${({ theme }) => theme.colors.tertiary};
      }
    }

    .headline {
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: -2px;
      opacity: 0.75;
      margin-bottom: 2rem;
      margin-right: 1rem;
      white-space: nowrap;
      flex: 1;

      @media screen and (${devices.md}) {
        margin-bottom: 0;
      }

      @media screen and (${devices.md}) {
        font-size: 3rem;
      }
    }

    .buttons {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      column-gap: 3rem;
      row-gap: 1rem;
      width: 100%;

      @media screen and (${devices.lg}) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      @media screen and (${devices.xl}) {
        width: auto;
      }

      span {
        text-transform: uppercase;
        opacity: 0.8;
      }
    }
  }
`;

type CallToActionSectionProps = {
  id: string;
  content: CallToActionSectionContent;
};

export const CallToActionSection: React.FC<CallToActionSectionProps> = (
  props,
) => {
  const theme = useTheme();
  const isDesktopBreakpoint = useMediaQuery(`(${devices.xl})`);

  return (
    <StyledCallToActionSection id={props.id}>
      <Animation type="fadeIn">
        <div className="service-description">
          <div className="intro">
            <h2>{props.content.title}</h2>
            <p>{props.content.subtitle}</p>
          </div>
          <div className="description">
            {props.content.service_description && (
              <ReactMarkdown>{props.content.service_description}</ReactMarkdown>
            )}
          </div>
        </div>
      </Animation>
      <Animation type="fadeRight" delay={200}>
        <div className="call-to-action-box">
          <div className="headline">Überzeugt ?</div>
          <div className="buttons">
            <ClientSideOnlyButton
              href={startQuestionnaire.href}
              label={startQuestionnaire.label}
              color={theme.colors.secondary}
              fixedWidth={isDesktopBreakpoint ? '18rem' : undefined}
              fullWidth={isDesktopBreakpoint ? false : true}
              icon={
                <ArrowRightCircleFill
                  size={20}
                  style={{ paddingLeft: '0.25rem' }}
                />
              }
            />
            {props.content.phone && (
              <>
                <span>Oder</span>
                <ClientSideOnlyButton
                  href={`tel:${props.content.phone}`}
                  label={props.content.phone}
                  color={theme.colors.primary}
                  fixedWidth={isDesktopBreakpoint ? '18rem' : undefined}
                  fullWidth={isDesktopBreakpoint ? false : true}
                />
              </>
            )}
          </div>
        </div>
      </Animation>
    </StyledCallToActionSection>
  );
};