import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import type { ContactDetailsFormValues } from '../../../components/Form';
import { setBrowserHistoryState } from '../../../utils/setBrowserHistoryState';

/**
 * Types
 */

export type QuestionnaireDispatch = (action: QuestionnaireAction) => void;

export type QuestionnaireAction =
  | {
      type: 'setIndex';
      payload: {
        index: number;
      };
    }
  | {
      type: 'setAnswer';
      payload: {
        index: number;
        item: QuestionnaireState['questionnaire'][number];
      };
    }
  | {
      type: 'setDetails';
      payload: {
        values: QuestionnaireState['contact'];
      };
    };

export type QuestionnaireAnswer = {
  question: { id: number; value: string };
  answer: { id: number; value: string };
};

export type QuestionnaireState = {
  index: number;
  questionnaire: QuestionnaireAnswer[];
  contact: ContactDetailsFormValues & {
    city?: string | undefined;
    postalCode?: string | undefined;
  };
};

/**
 * State logic
 */

export const questionnaireReducer = (
  state: QuestionnaireState,
  action: QuestionnaireAction,
): QuestionnaireState => {
  switch (action.type) {
    case 'setIndex': {
      // Keep browser history in sync to enable browser back within form
      setBrowserHistoryState({ index: action.payload.index });
      return { ...state, index: action.payload.index };
    }
    case 'setAnswer': {
      const updatedQuestionnaire = [...state.questionnaire];
      updatedQuestionnaire[action.payload.index] = action.payload.item;
      return { ...state, questionnaire: updatedQuestionnaire };
    }
    case 'setDetails': {
      return { ...state, contact: { ...action.payload.values } };
    }
    default: {
      throw new Error(`Unhandled action: ${JSON.stringify(action)}`);
    }
  }
};

/**
 * Context Provider
 */

export const QuestionnaireStateContext =
  createContext<QuestionnaireState | null>(null);

export const QuestionnaireDispatchContext =
  createContext<QuestionnaireDispatch | null>(null);

type QuestionnaireProviderProps = {
  initialState?: QuestionnaireState;
  children?: React.ReactNode;
};

export const QuestionnaireProvider: React.FC<QuestionnaireProviderProps> = ({
  children,
  initialState,
}) => {
  const [state, dispatch] = useReducer(
    questionnaireReducer,
    initialState ?? {
      index: 0,
      contact: {},
      questionnaire: [],
    },
  );

  const browserBackHandler = useCallback((event: PopStateEvent) => {
    const index = event.state?.options.index;
    if (index >= 1) {
      dispatch({ type: 'setIndex', payload: { index } });
    } else {
      dispatch({ type: 'setIndex', payload: { index: 0 } });
    }
  }, []);

  useEffect(() => {
    if (state.index > 0)
      window.addEventListener('popstate', browserBackHandler);
    return () => window.removeEventListener('popstate', browserBackHandler);
  }, [state.index, browserBackHandler]);

  return (
    <QuestionnaireStateContext.Provider value={state}>
      <QuestionnaireDispatchContext.Provider value={dispatch}>
        {children}
      </QuestionnaireDispatchContext.Provider>
    </QuestionnaireStateContext.Provider>
  );
};

/**
 * Hooks / Helper
 */

export const useQuestionnaireContext = () => {
  const state = useContext(QuestionnaireStateContext);
  const dispatch = useContext(QuestionnaireDispatchContext);

  if (state == null || dispatch == null) {
    throw new Error(
      'useQuestionnaireContext must be used within a QuestionnaireProvider',
    );
  }

  return { state, dispatch };
};
