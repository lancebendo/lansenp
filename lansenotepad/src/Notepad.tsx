import React, { ChangeEvent, KeyboardEvent, useRef } from 'react';

interface Note {
    _id: string,
    Name: string,
    Text: string,
  }
  
export interface NotepadProps {
    SelectedNote: Note,
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    onTab:  (e: string, cb?: () => void) => void
}
 

const Notepad: React.FunctionComponent<NotepadProps> = props => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void = e => {
        if(e.key !== 'Tab') return;
        
        e.preventDefault();
        
        var start: number = textAreaRef.current!.selectionStart,
            end: number = textAreaRef.current!.selectionEnd,
            text: string = props.SelectedNote.Text;
            
        props.onTab(text.substring(0, start) + "\t" + text.substring(end || 0), () => {
            textAreaRef.current!.selectionStart = textAreaRef.current!.selectionEnd = start + 1;
        });
    };

    return ( 
        <textarea 
            ref={textAreaRef}
            className="form-control" 
            value={props.SelectedNote.Text || ''}
            onKeyDown={onKeyDown} 
            onChange={props.onChange} 
        />
     );
}
 
export default Notepad;