import { NavLink } from 'react-router-dom'
import './header.scss'
import { useState } from 'react'
import { IoMenuSharp , IoCloseSharp} from "react-icons/io5";
import { UseUserInfo } from '../../store/UseUserInfo';
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const logout = UseUserInfo(state=> state.logout)
  const nav = [
    {
      link: '/',
      title: 'דש-בורד'
    },
    {
      link: 'editors-view',
      title: 'משתמשים'
    },
    {
      link: 'tags-view',
      title: 'תגיות'
    },
    {
      link: 'questions-view',
      title: 'שאלות'
    },
    {
      link: 'articles-view',
      title: 'מאמרים'
    },
    {
      link: 'video-view',
      title: 'וידאו'
    },{
      link: 'qa-edit',
      title: 'עריכת שו"ת'
    },
  ]
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserInfo(null); 
};

  return (
    <header className='Header'>
      <h1>לַמְּדֵנִי חֻוקֶּךָ</h1>
      <button className='navBtn' onClick={toggleMenu}> 
        {!menuOpen ? <IoMenuSharp/> : <IoCloseSharp/>}
      </button>
      <div className={`containerBtnNav${menuOpen ? " open" : " close"}`}>
      <nav className="nav navMobile" >
        {nav.map(item => (
          <NavLink onClick={toggleMenu} key={item.link} to={`${item.link}`}>{item.title}</NavLink>
        ))}
      </nav>
      <button className='logout' onClick={logout}>התנתק</button>
        </div>
    </header>
  )
}
