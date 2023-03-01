import { Button, Layout } from '@/components'
import { getServerUser } from '@/utils'
import { signOut } from 'next-auth/react'

export default function Overview({ user }) {
  return (
    <Layout user={user}>
      <div className="flex min-h-[700px] flex-col flex-wrap items-start gap-2">
        <div className="flex flex-wrap gap-1">
          <Button size="xs">mini</Button>
          <Button size="sm">sm</Button>
          <Button size="md">md</Button>
          <Button size="lg">lg</Button>
          <Button size="xl">xl</Button>
          <Button>Auto</Button>
        </div>
        <div className="flex flex-wrap gap-1">
          <Button>primary</Button>
          <Button color="secondary">secondary</Button>
          <Button color="success">success</Button>
          <Button color="warning">warning</Button>
          <Button color="danger">danger</Button>
        </div>
        <div className="flex flex-wrap gap-1">
          <Button bordered>primary</Button>
          <Button color="secondary" bordered>
            secondary
          </Button>
          <Button color="success" bordered>
            success
          </Button>
          <Button color="warning" bordered>
            warning
          </Button>
          <Button color="error" bordered>
            danger
          </Button>
        </div>
        <div className="flex flex-wrap gap-1">
          <Button flat>primary</Button>
          <Button color="secondary" flat>
            secondary
          </Button>
          <Button color="success" flat>
            success
          </Button>
          <Button color="warning" flat>
            warning
          </Button>
          <Button color="danger" flat>
            danger
          </Button>
        </div>
        <div className="flex flex-wrap gap-1">
          <Button ghost>primary</Button>
          <Button color="secondary" ghost>
            secondary
          </Button>
          <Button color="success" ghost>
            success
          </Button>
          <Button color="warning" ghost>
            warning
          </Button>
          <Button color="danger" ghost>
            danger
          </Button>
        </div>
        <div className="flex flex-wrap gap-1">
          <Button shadow>primary</Button>
          <Button color="secondary" shadow>
            secondary
          </Button>
          <Button color="success" shadow>
            success
          </Button>
          <Button color="warning" shadow>
            warning
          </Button>
          <Button color="danger" shadow>
            danger
          </Button>
        </div>
      </div>
      <Button
        // href={'/api/auth/signout'}
        onClick={(e) => {
          e.preventDefault()
          signOut()
        }}
      >
        Sign out
      </Button>
    </Layout>
  )
}

export async function getServerSideProps({ req, res }) {
  const { user } = await getServerUser(req, res)
  return {
    props: {
      user
    }
  }
}
