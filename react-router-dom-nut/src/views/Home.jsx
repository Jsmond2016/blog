import { useEffect,  } from "react"

const Home = () => {



  useEffect(() => {
    console.log('mount')
    return () => {
      console.log('un-mount')
    }
  }, [])

  return (
    <div>
      
      <h2>Home.....</h2>
    </div>
  )
}

export default Home