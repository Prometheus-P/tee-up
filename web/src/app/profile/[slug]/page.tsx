import { ProfileTemplate } from '../ProfileTemplate'
import { defaultProfileSlug, profileLibrary } from '../profile-data'

type Params = {
  slug: string
}

export function generateStaticParams(): Params[] {
  return Object.keys(profileLibrary).map((slug) => ({ slug }))
}

export default function ProfileDetailPage({ params }: { params: Params }) {
  const data = profileLibrary[params.slug] ?? profileLibrary[defaultProfileSlug]
  return <ProfileTemplate data={data} />
}
