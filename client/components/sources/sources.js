import React from 'react';
import axios from 'axios';

import SourceService from 'services/source.service';
import EmitterService from 'services/emitter.service';

import './sources.css';

class Categories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sources: [],
            name: '',
            url: '',
            category: ''
        };
    }

    componentWillMount() {
        this.getSources();
    }

    async getSources() {
        let sources = await SourceService.getSources();

        this.setState({
            sources: sources
        });
    }

    onNameInput(e) {
        this.setState({ name: e.target.value });
    }

    onCategoryInput(e) {
        this.setState({ category: e.target.value });
    }

    onURLInput(e) {
        this.setState({ url: e.target.value });
    }

    onSubmit(e) {
        let source = {
            name: this.state.name,
            url: this.state.url,
            category: this.state.category
        }

        let sources = this.state.sources;
        sources.push(source);
        this.updateSources(sources);

        this.setState({
            name: '',
            url: '',
            category: ''
        });

        e.preventDefault();
    }

    onDelete(index) {
        let sources = this.state.sources;
        sources.splice(index, 1);
        this.updateSources(sources);
    }

    updateSources(sources) {
        SourceService.updateSources(sources);
        EmitterService.emit('source-change');
        this.setState({
            sources: sources
        });

    }

    onSave() {

    }

    render() {
        return (
            <div className='sources'>
                <section className="card current-source">
                    <div className="card-header">
                        Current Sources
                    </div>
                    <table className='table table-responsive table-bordered'>
                        <thead className="thead-light">
                            <tr >
                                <th>Name</th>
                                <th>RSS URL</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.sources.map((source, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{source.name}</td>
                                        <td>{source.url}</td>
                                        <td>{source.category}</td>
                                        <td><button type="button" className="btn btn-outline-danger" onClick={this.onDelete.bind(this, index)}>Remove</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </section>

                <section className="card add-source">
                    <div className="card-header">
                        Add Source
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label >Source Name</label>
                                <input required className="form-control" value={this.state.name} onChange={this.onNameInput.bind(this)} />
                            </div>

                            <div className="form-group">
                                <label >RSS URL</label>
                                <input required className="form-control" value={this.state.url} onChange={this.onURLInput.bind(this)} />
                            </div>

                            <div className="form-group">
                                <label >Category</label>
                                <input required className="form-control" value={this.state.category} onChange={this.onCategoryInput.bind(this)} />
                            </div>

                            <button type="submit" className="btn btn-primary" onClick={this.onSubmit.bind(this)}> Add Source</button>
                        </form>
                    </div>
                </section>
            </div>
        );

    }
}

export default Categories;