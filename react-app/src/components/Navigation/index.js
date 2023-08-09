import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
	return (
		<nav className="navbar">
			<div>
				{/* <NavLink exact to="/">Home</NavLink> */}
				<div className='clickable' onClick={() => history.push('/')}>Home</div>
			</div>
			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</nav>
	);
}

export default Navigation;
