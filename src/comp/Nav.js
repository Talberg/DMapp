import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function DnDNav() {
  const createNavItem = (text, path) => {
    const navItem = document.createElement('li');
    navItem.className = 'nav-item';

    const navLink = document.createElement('a');
    navLink.className = 'nav-link';
    navLink.textContent = text;
    navLink.href = path;

    navItem.appendChild(navLink);
    return navItem;
  };

  const navBar = document.createElement('nav');
  navBar.className = 'navbar navbar-expand-sm navbar-dark bg-dark';

  const brand = document.createElement('a');
  brand.className = 'navbar-brand';
  brand.textContent = 'Dungeon Delver';

  const icon = document.createElement('span'); // Placeholder for icon
  icon.className = 'dnd-nav-icon';
  brand.appendChild(icon);

  navBar.appendChild(brand);

  const toggler = document.createElement('button');
  toggler.className = 'navbar-toggler';
  toggler.setAttribute('type', 'button');
  toggler.setAttribute('data-toggle', 'collapse');
  toggler.setAttribute('data-target', '#collapseNavbar');
  toggler.setAttribute('aria-controls', 'collapseNavbar');
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-label', 'Toggle navigation');

  const togglerIcon = document.createElement('span');
  togglerIcon.className = 'navbar-toggler-icon';
  toggler.appendChild(togglerIcon);

  navBar.appendChild(toggler);

  const collapse = document.createElement('div');
  collapse.className = 'collapse navbar-collapse';
  collapse.id = 'collapseNavbar';

  const navList = document.createElement('ul');
  navList.className = 'navbar-nav mr-auto';

  navList.appendChild(createNavItem('Characters', '/characters'));
  navList.appendChild(createNavItem('Campaigns', '/campaigns'));
  navList.appendChild(createNavItem('Spells', '/spells'));
  navList.appendChild(createNavItem('Bestiary', '/bestiary'));

  collapse.appendChild(navList);
  navBar.appendChild(collapse);

  return navBar;
}

export default DnDNav;
