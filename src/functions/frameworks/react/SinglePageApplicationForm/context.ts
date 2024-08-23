import { createContext, useState } from 'react'

type SinglePageApplicationFormContext = {
  step: number
  incrementStep: () => void
  decrementStep: () => void
}

export const SinglePageApplicationFormContext = createContext<SinglePageApplicationFormContext>(
  {} as SinglePageApplicationFormContext,
)

export const singlePageApplicationFormContextDefaultValue: () => SinglePageApplicationFormContext = () => {
  const [step, setStep] = useState(1)
  const incrementStep = () => setStep((s) => Math.min(s + 1, 4))
  const decrementStep = () => setStep((s) => Math.max(s - 1, 1))

  return { step, incrementStep, decrementStep }
}
