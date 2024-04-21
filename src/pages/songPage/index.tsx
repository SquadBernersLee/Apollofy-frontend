import { GoBackPageBtn } from './GoBackPage'
import { MusicShowPage } from './MusicShowPage'

import AudioPlayer from '../../components/audioPlayer'

export function SongPage() {
  return (
    <section  className='bg-background w-screen h-screen'>
        <GoBackPageBtn />
        <MusicShowPage />
        <AudioPlayer/>
    </section>
  )
}
