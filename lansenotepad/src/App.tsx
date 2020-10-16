import React, { ChangeEvent, MouseEvent } from 'react';
import axios from 'axios';
import { ObjectID } from 'mongodb';
import Header from './Header';
import Notepad from './Notepad';
import Menu from './Menu';

const saveWaitMS: number = 2000;

enum StatusMessages {
  Welcome = 'Welcome',
  Loading = 'Loading...',
  Saving = 'Saving...',
  Saved = 'Saved...',
}

interface Props {}

interface State {
  Status: StatusMessages,
  Timer?: NodeJS.Timeout,
  Notes: Note[],
  SelectedNote: Note,
}

interface Note {
  _id: string,
  Name: string,
  Text: string,
}


class App extends React.Component<Props, State> {

  state: State = {
    Status: StatusMessages.Welcome,
    Timer: undefined,
    Notes: [],
    SelectedNote: { _id: '', Name: '', Text: '' },
  }

  componentDidMount = () => {
    this.setState({ Status: StatusMessages.Loading });

    axios.get<Note[]>(`http://localhost:3100/notes/`)
        .then(response => this.setState({
          Notes: response.data,
          SelectedNote: response.data[0],
          Status: StatusMessages.Welcome,
        }));
  }

  onClickNew: (e: MouseEvent<HTMLButtonElement>) => void = e => {
    axios.post<string>(`http://localhost:3100/notes/`, { Name: '', Text: '' })
    .then(newNote => {
      this.setState({ Status: StatusMessages.Loading }, () => {
        axios.get<Note[]>(`http://localhost:3100/notes/`)
        .then(response => this.setState({
          Notes: response.data,
          SelectedNote: response.data.filter(note => note._id === newNote.data)[0],
          Status: StatusMessages.Welcome,
        }));
      });
    });
  }

  onClickDelete: (e: MouseEvent<HTMLButtonElement>) => void = e => {
    axios.delete(`http://localhost:3100/notes/${this.state.SelectedNote._id}/`)
    .then(() => {
      this.setState({ Status: StatusMessages.Loading }, () => {
        axios.get<Note[]>(`http://localhost:3100/notes/`)
        .then(response => this.setState({
          Notes: response.data,
          SelectedNote: response.data[0],
          Status: StatusMessages.Welcome,
        }));
      });
    });
  }

  changeNameHandler: (e: ChangeEvent<HTMLInputElement>) => void = e => {
    if(this.state.Timer) clearTimeout(this.state.Timer);
      
    let name = e.target.value;
    
    const timer: NodeJS.Timeout = setTimeout(value => {
      const data = { 
        ...this.state.SelectedNote,
        Name: value,
      };

      axios.put<Note>(`http://localhost:3100/notes/${this.state.SelectedNote._id}/`, data)
      .then(() => {
        this.setState({ Status: StatusMessages.Saved })
        
        axios.get<Note[]>(`http://localhost:3100/notes/`)
        .then(response => this.setState({
          Notes: response.data,
          SelectedNote: response.data.filter(note => note._id === data._id)[0],
          Status: StatusMessages.Welcome,
        }));
      });

    }, saveWaitMS, name);

    this.setState({
      Status: StatusMessages.Saving,
      SelectedNote: {
        ...this.state.SelectedNote,
        Name: name,
      },
      Timer: timer,
    });
  }

  selectChangeHandler: (e: ChangeEvent<HTMLSelectElement>) => void = e => {
    const id = e.target.value;
    
    const newSelection: Note = this.state.Notes.filter(note => note._id === id)[0];
    this.setState({
      SelectedNote: {
        ...newSelection
      }
    });
  }

  changeHandler: (e: ChangeEvent<HTMLTextAreaElement> | string, cb?: () => void) => void = (e, cb?) => {
    if(this.state.Timer) clearTimeout(this.state.Timer);
      
    let text = typeof e === 'string' ? e : e.target.value; 

    const timer: NodeJS.Timeout = setTimeout(value => {
      const data = { 
        ...this.state.SelectedNote,
        Text: value,
      };

      axios.put<Note>(`http://localhost:3100/notes/${this.state.SelectedNote._id}/`, data)
      .then(() => this.setState({ Status: StatusMessages.Saved }));

    }, saveWaitMS, text);

    this.setState({ 
      Status: StatusMessages.Saving,
      SelectedNote: {
        ...this.state.SelectedNote,
        Text: text,
      },
      Timer: timer,
    }, cb);
  }

  render () {
    return (
      <div className="App">
        <Header statusMessage={this.state.Status} />
        <Menu onClickDelete={this.onClickDelete} onClickNew={this.onClickNew} Notes={this.state.Notes} onChange={this.changeNameHandler} onSelectChange={this.selectChangeHandler} SelectedNote={this.state.SelectedNote} />
        <Notepad SelectedNote={this.state.SelectedNote} onChange={this.changeHandler} onTab={this.changeHandler}/>
      </div>
    );
  }

}

export default App;
