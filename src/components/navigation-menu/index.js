import Link from 'next/link'

export default function NavigationMenu() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/overview">General</Link>
        </li>
        <li>
          <Link href="/files">Archivos</Link>
        </li>
        <li>
          <Link href="/shared">Compartidos</Link>
        </li>
        <li>
          <Link href="/favorites">Favoritos</Link>
        </li>
        <li>
          <Link href="/bin">Papelera</Link>
        </li>
        <hr />
        <li>Almacenamiento</li>
      </ul>
    </nav>
  )
}
