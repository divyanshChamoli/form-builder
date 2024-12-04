import { ReactNode } from 'react'

function Card({children} : {children: ReactNode}) {
  return (
    <section className="w-4/5 p-10 flex flex-col content-center gap-5 shadow-lg bg-white">
        {children}
    </section>
  )
}

export default Card