import React, { useState, useRef } from 'react';

export default function Nav() {
    const [search, setSearch] = useState('');
    const [findBuil, setFindBuil] = useState('');
    const [drawNav, setDrawNav] = useState(0);
    const navRef = useRef(null);

    let database = [];

    return (
        <div id='nav' style={{position: 'absolute', height: '100vh', width: '300px', backgroundColor: '#cccccc', textAlign: 'center'}}>
            <input className="nav-input"
                    placeholder="건물명"
                    type="text"
                    ref={navRef}
                    value={findBuil}
                    onKeyDown={(evt) => {
                        if (evt.key === 'Enter') {
                            setSearch(findBuil);
                            navRef.current.focus();
                        }
                    }}
                    onChange={(e) => setFindBuil(e.target.value)}
                    style={{margin: '40px'}} />
            <div id='nav-btn-box'>
                <button type='button' onClick={()=>setDrawNav(0)}>버튼1</button>
                <button type='button' onClick={()=>setDrawNav(1)}>버튼2</button>
                <button type='button' onClick={()=>setDrawNav(2)}>버튼3</button>
            </div>
            <DrawNav />
        </div>
    );
}

const DrawNav = () => {
    return (
        <div>

        </div>
    );
}