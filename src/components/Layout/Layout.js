import React from 'react';
import Aux from '../../hoc/Aux';
import Style from './Layout.module.css';

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={Style.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;