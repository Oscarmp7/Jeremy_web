import HomeReel from '../components/HomeReel/HomeReel'
import HomeClientBand from '../components/HomeClientBand/HomeClientBand'
import HomeEndFrame from '../components/HomeEndFrame/HomeEndFrame'

export default function HomePage({ ready }) {
  return (
    <>
      <HomeReel ready={ready} />
      <HomeClientBand />
      <HomeEndFrame />
    </>
  )
}
