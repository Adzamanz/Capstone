import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Menu from '../Menu';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
	return (
		<nav className="navbar">
			<div className='t_nav'> <img src='wbk-logo.jpg' className='logo_nav'/> </div>
			<div className='b_nav'>
				<div>
					<div className='clickable' onClick={() => history.push('/')}>Home</div>
				</div>
				<div className="main_menu">
					{sessionUser &&
					<div className='page_nav'>
						<div className='menu_option clickable' onClick={() => history.push("/feeds")}>Message Board</div>
						<div className='menu_option clickable' onClick={() => history.push("/donations")}>My Donations</div>
						<div className='menu_option clickable' onClick={() => history.push("/my_posts")}>My Posts</div>
					</div>}
				</div>
				{isLoaded && (
					<div>
						<ProfileButton user={sessionUser} />
					</div>
				)}
			</div>
		</nav>
	);
}

export default Navigation;
