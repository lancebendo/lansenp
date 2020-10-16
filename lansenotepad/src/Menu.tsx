import { NodeWorker } from 'inspector';
import React, { ChangeEvent, MouseEvent } from 'react';

interface Note {
    _id: string,
    Name: string,
    Text: string,
  }

interface MenuProps {
    Notes: Note[],
    SelectedNote: Note,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onSelectChange:  (e: ChangeEvent<HTMLSelectElement>) => void,
    onClickNew: (e: MouseEvent<HTMLButtonElement>) => void,
    onClickDelete: (e: MouseEvent<HTMLButtonElement>) => void,
};

const Menu: React.FunctionComponent<MenuProps> = props => {

    return (
        <div className="menu row">
            <select onChange={props.onSelectChange} className="custom-select col-sm-4" id="inputGroupSelect01">
                <option selected disabled>Choose...</option>
                {
                    props.Notes.map((note, i) => (
                    <option 
                        key={i} 
                        value={note._id} 
                        selected={props.SelectedNote._id === note._id}>
                        {note.Name}
                    </option>
                    ))
                }
            </select>
            <input onChange={props.onChange} value={props.SelectedNote.Name || ''} type="text" className="form-control col-sm-4" placeholder="Note name"/>
            <button onClick={props.onClickNew} className="btn btn-primary col-sm-1" type="button">New</button>
            <button onClick={props.onClickDelete} className="btn btn-primary col-sm-1" type="button">Delete</button>
        </div>
    );
};

export default Menu;