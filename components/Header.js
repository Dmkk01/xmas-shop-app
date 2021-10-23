import headerStyles from '../styles/Header.module.scss'

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>Droppe</span> Xmas
      </h1>
    </div>
  )
}

export default Header