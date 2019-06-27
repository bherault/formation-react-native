import React from "react";
import {View, FlatList, Platform, StyleSheet, Text, ScrollView, Elements} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import VideoComponent from "../components/VideoComponent";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as defaultActions from "../actions/defaultActions";
import * as velibActions from "../actions/velibActions";

const user = {
	prenom:"Bastien",
	nom:"HERAULT"
};

export class MainScreen extends React.Component {

	state = {
		videoStatus: "Reading"
	}

	fetchData = () => {
		let results = fetch(
			"https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&facet=overflowactivation&facet=creditcard&facet=kioskstate&facet=station_state"
		);
		results.then(response => {
			response.json().then(data => {
				this.setState({
					data: data
				});
			})
		});
	}

	onVideoEnded = (uri) => {
		console.log(uri);
		this.setState({
			videoStatus: "Ended!"
		});
	}

	renderRow = ({item}) => {
		let isBookmarked = (this.props.velib_bookmarked.find(velib => velib.id === item.recordid));
		let jsx = <Icon.Button
			name="plus-circle"
			backgroundColor="green"
			onPress={() => this.props.velibActions.addBookmark({id:item.recordid,name:item.fields.station_name})}
		>
			Ajouter aux favoris
		</Icon.Button>;
		if (isBookmarked) {
			jsx = <Icon.Button
				name="minus-circle"
				backgroundColor="red"
				onPress={() => this.props.velibActions.removeBookmark(item.recordid)}
			>
				Supprimer des favoris
			</Icon.Button>;
		}
		return (
			<View style={styles.station}>
				<Text style={styles.stationName}>Station : {item.fields.station_name}</Text>
				{jsx}
			</View>
		)
	}

	render() {
		console.log(this.state.data);
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.welcome}>Coucou {user.prenom + ' ' + user.nom} !</Text>
				<Text style={styles.lead}>Pour commencer,{`\n`} saches que je te trouve très beau !</Text>
				<VideoComponent
					videoEnded={(uri) => this.onVideoEnded(uri)}
					controls={true}
					uri={"https://redirector.googlevideo.com/videoplayback?expire=1561646071&ei=ln8UXbr0McOL8gSm4ajwBQ&ip=2600%3A3c03%3A%3Af03c%3A91ff%3Afec1%3Af2b6&id=o-AJvBEqtbkm1TmG2rE5yopjl9O5p7-2Q0F5f-85rQ3uP-&itag=18&source=youtube&requiressl=yes&mm=31%2C26&mn=sn-ab5l6nzl%2Csn-p5qlsndr&ms=au%2Conr&mv=m&pl=32&initcwndbps=173750&mime=video%2Fmp4&gir=yes&clen=32389&ratebypass=yes&dur=2.066&lmt=1546664038016152&mt=1561624367&fvip=5&c=WEB&txp=2211222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=ALgxI2wwRAIgQHLeIS95RfPWuWBBHDujJY4PGr9t6nOdrL8tmkLb6PsCIAHPnvQLnBdFjI0274YLtt8xoUoxDfHd0YBeU4I9qMvC&lsparams=mm%2Cmn%2Cms%2Cmv%2Cpl%2Cinitcwndbps&lsig=AHylml4wRQIhAMzXCu-OcNanjODLDJimzhmjVLHmTLsZz_29VnfxHzYfAiAxDaOUvjZ4ZD86NZA7SmwWy9iBbfdJIm3cXMoiBgNwlw%3D%3D&title=Tada%20-%20Sound%20Effect"}
				/>
				<Text style={styles.instructions}>{this.state.videoStatus}</Text>
				{this.state.data &&
					<FlatList
						keyExtractor={(item) => "" + item.recordid}
						data={this.state.data.records}
						renderItem={(item) => this.renderRow(item)}
						extraData={this.props.velib_bookmarked}
					/>
				}
			</ScrollView>
		);
	}

	componentDidMount() {
		this.fetchData();
		this.props.defaultActions.acceptCgu(true);
	}

}

// Ajoute des variables issues du store aux variables du MainScreen via les props
function mapStateToProps(state) {
	return {
		user: state.defaultReducer.user,
		cgu_accepted: state.defaultReducer.cgu_accepted,
		velib_bookmarked: state.velibReducer.velib_bookmarked,
	}
}

// Permet d'utiliser les actions des reducers depuis le MainScreen
function mapDispatchToProps(dispatch) {
	return {
		defaultActions: bindActionCreators(defaultActions, dispatch),
		velibActions: bindActionCreators(velibActions, dispatch),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		color: 'coral',
	},
	lead: {
		fontSize: 16,
		textAlign: 'center',
		color: 'cadetblue',
		marginBottom: 5,
	},
	station: {
		marginBottom: 10,
		marginTop: 10,
		padding: 15,
		backgroundColor: '#ccc',
	},
	stationName: {
		fontSize: 16,
		textAlign: 'center',
		color: 'black',
		textTransform: 'uppercase',
	},
	instructions: {
		fontSize: 14,
		textAlign: 'center',
		color: '#cccccc',
		marginBottom: 5,
	},
});
