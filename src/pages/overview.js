import { Button, Layout } from '@/components'
import { getServerUser } from '@/utils'

export default function Overview({ user }) {
  return (
    <Layout user={user}>
      {/* <Button
        ghost
        onClick={(e) => {
          e.preventDefault()
          signOut()
        }}
      >
        Sign out
      </Button> */}
      <Button>Hola mundo</Button>
      <Button color="secondary">Hola mundo</Button>
      <Button color="success">Hola mundo</Button>
      <Button color="warning">Hola mundo</Button>
      <Button color="danger">Hola mundo</Button>
      <hr />
      flat
      <Button flat>Hola mundo</Button>
      <Button color="secondary" flat>
        Hola mundo
      </Button>
      <Button color="success" flat>
        Hola mundo
      </Button>
      <Button color="warning" flat>
        Hola mundo
      </Button>
      <Button color="danger" flat>
        Hola mundo
      </Button>
      <hr />
      bordered
      <Button bordered>Hola mundo</Button>
      <Button color="secondary" bordered>
        Hola mundo
      </Button>
      <Button color="success" bordered>
        Hola mundo
      </Button>
      <Button color="warning" bordered>
        Hola mundo
      </Button>
      <Button color="danger" bordered>
        Hola mundo
      </Button>
      <hr />
      Ghost
      <Button ghost>Hola mundo</Button>
      <Button color="secondary" ghost>
        Hola mundo
      </Button>
      <Button color="success" ghost>
        Hola mundo
      </Button>
      <Button color="warning" ghost>
        Hola mundo
      </Button>
      <Button color="danger" ghost>
        Hola mundo
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
