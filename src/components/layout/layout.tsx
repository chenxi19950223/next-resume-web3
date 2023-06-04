import {ReactNode} from "react";

function Layout({children}: { children: ReactNode }) {
    return (
        <div className='min-w-[400px]'>
            {children}
        </div>
    );
}

export default Layout;
