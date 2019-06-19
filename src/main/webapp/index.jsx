class MTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mypref: "initialized"
        };
    }

    // Runs after the component output has been rendered to the DOM.
    componentDidMount() {

        const url = this.props.sourceUrl;
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        var p1 = fetch(url, headers);
        var p2 = p1.then(
            function(res) {
                console.log("res=" + res.body);
                return res.json()
            },
            (error) => {
                // A fetch() promise will reject with a TypeError when a network error is encountered or CORS is
                // misconfigured on the server side, although this usually means permission issues or similar —
                // a 404 does not constitute a network error, for example.
                console.error("error=" + error);
                console.error("error=" + error.constructor.name);
                return error;
            }
        );
 
        p2.then(
            (response) => {
                console.log(response);
                this.setState({
                    isLoaded: true,
                    mypref: response.Message
                });
            },
            (error) => {
                // Note: it's important to handle errors here instead of a catch(..) so that
                // it doesn't swallow exceptions from actual bugs in components.
                console.error(typeof error);
                console.error(error);
                this.setState({
                    isLoaded: true,
                    mypref: "error"
                });
            }
        );
        
    }

    render() {

        var tableHeaders = (
        <thead>
        <tr>
        {this.state.mypref}
        </tr>
        </thead>);

        return (
            <table className="table table-bordered table-hover" width="100%">
            {tableHeaders}
            </table>
        );

    }

}

ReactDOM.render(
    <MTable sourceUrl="services/HelloWorld" />,
    document.getElementById('app')
);
