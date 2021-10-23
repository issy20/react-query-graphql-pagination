import { ReactNode, VFC } from 'react'

interface Props {
  children: ReactNode
}

export const Layout: VFC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center text-sm text-gray-600 font-mono">
      <main className="flex flex-1 w-screen justify-center items-center flex-col">
        {children}
      </main>
    </div>
  )
}
