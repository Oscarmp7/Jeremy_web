import Hero from '../components/Hero/Hero'

export default function HomePage({ ready }) {
  return (
    <div className="page page--home">
      <Hero ready={ready} />
    </div>
  )
}
