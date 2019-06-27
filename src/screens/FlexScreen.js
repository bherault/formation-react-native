import React from "react";
import { ScrollView, Text, View } from "react-native";

export default class FlexScreen extends React.Component {
  render() {
    return (
      	<ScrollView>
			<Text style={{fontSize: 25, textAlign: 'center', marginTop: 15}}>DESIGN</Text>
			<View>
				<Text>Col 1</Text>
				<Text>Col 2</Text>
				<Text>Col 3</Text>
				<Text>Col 4</Text>
				<Text>Col 5</Text>
			</View>
		</ScrollView>
    );
  }
}


