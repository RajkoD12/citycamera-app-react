import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { sessionService } from '../../sessionService/storage';
import { filesService } from '../../services/file.service';
import { Files } from './files';

export class Folders extends React.Component {
    constructor() {
        super()
        this.state = {
            folders: [],
            files: []
        }
        this.getAllFilesForFolder = this.getAllFilesForFolder.bind(this);
    }
    componentWillMount() {

        filesService.userFolders().then(response => {
            this.setState({
                folders: response.data.folders
            });
        }).catch(function (error) {
            console.log('error filesService', error);
        });
    }

    getAllFilesForFolder = (event) => {
        event.preventDefault();

        filesService.userFiles(event.target.innerText).then(response => {
            console.log('response all files', response.data.files);
            this.setState({
                files: response.data.files
            });
            this.props.history.push("/dashboard/folder/files");
        }).catch(function (error) {
            console.log('error getAllFilesForFolder', error);
        });
    }

    render() {
        const { match } = this.props;
        console.log('match.path', match);

        let folders = this.state.folders;
        return (
            <div>
                <h1>Folders</h1>
                <ul>
                    {folders.map((item) =>
                        <li><Link to={`/dashboard/folder/${item}`} key={item} onClick={this.getAllFilesForFolder}>{item} </Link></li>
                    )}
                </ul>
                <Route path={`${match.path}/files`} render={() => (
                    <Files list={this.state.files} />
                )} />
            </div>
        )
    }
}