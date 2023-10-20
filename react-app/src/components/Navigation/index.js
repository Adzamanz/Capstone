import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Menu from '../Menu';
import webeke from "./wbk-logo.jpg"
import { logout } from '../../store/session';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
	return (
		<nav className="navbar">
			<div className='t_nav'> <img src={webeke} className='logo_nav'/> </div>
			<div className='b_nav'>
				{sessionUser &&
				<div className='main_menu'>
					<div className='gap'></div>
					<div className='menu_option clickable' onClick={() => history.push('/')}>
						<i class="ri-home-2-fill"></i>
						<div className='size_check'>Home</div>
					</div>
					<div className='gap'></div>
					<div className='menu_option clickable' onClick={() => history.push("/feeds")}>
						<i class="ri-discuss-fill"></i>
						<div className='size_check'>Forum</div>
					</div>
					<div className='gap'></div>
					<div className='menu_option clickable' onClick={() => history.push("/donations")}>
						<i class="ri-money-dollar-box-fill"></i>
						<div className='size_check'>Donations</div>
						</div>
					<div className='gap'></div>
					<div className='menu_option clickable' onClick={() => history.push("/my_posts")}>
						<i class="ri-archive-fill"></i>
						<div className='size_check'>Posts</div>
					</div>
				</div>}
				{isLoaded && (
					<div className='profile_button_div'>
						<ProfileButton user={sessionUser} />
					</div>
				)}
			</div>
		</nav>
	);
}

export default Navigation;
