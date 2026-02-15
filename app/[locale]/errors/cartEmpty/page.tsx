import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div>
        <h1 className="text-2xl text-red-600 font-mono">ERROR: Your Cart is empty.</h1>
        <Link href={"/"}>Return Home</Link>
    </div>
  )
}

export default Page