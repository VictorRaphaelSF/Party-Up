import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
	StyleSheet,
	View,
	Text,
	Pressable,
	Image,
	Platform,
	Dimensions,
	Modal,
	TouchableWithoutFeedback,
	ScrollView,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import Navbar from "../components/navbar";
import Backbutton from "../components/backbutton";
import CardEvent from "../components/cardEvent";

export default function Telaprofile() {
	const navigation = useNavigation();
	const [eventData, setEventData] = useState([]);
	const [profileImage, setProfileImage] = useState(null);
	const [isMenuVisible, setMenuVisible] = useState(false);
	const [name, setName] = useState("");
	const [idade, setIdade] = useState("");
	const [descricao, setDescricao] = useState("");
	const [eventImage, setEventImage] = useState(null);
	const [eventId, setEventId] = useState(null);



	const menu = () => {
		setMenuVisible(true);
	};

	const closeMenu = () => {
		setMenuVisible(false);
	};

	const handleButtonEdit = () => {
		console.log('Botão edit pressionado')
	}

	const handleButtonHome = () => {
		navigation.navigate('telaprincipal', { id: id });
	};

	const handleButtonSearch = () => {
		navigation.navigate('search', { id: id });
		console.log("Botão edit pressionado");
	};

	const bttSair = () => {
		navigation.navigate('index');
		setMenuVisible(false);
	};

	const bttReport = () => {
		navigation.navigate('report');
		setMenuVisible(false);
	};

	const bttMyevent = () => {
		navigation.navigate('myevent');
		setMenuVisible(false);
	};

	const bttEventProgress = () => {
		navigation.navigate('event_progress');
		setMenuVisible(false);
	};

	const bttDashboard = () => {
		navigation.navigate('dashboard');
	};

	const route = useRoute();
	const { id } = route.params;
	const { imgProfile } = route.params;
	
	const idUser = {
		userId_code: id
	};

	//console.log(imgProfile);

	const handleEventImageClick = () => {
		if (eventId) {
			navigation.navigate("evento", { eventId });
		}
	};

	useEffect(() => {
		axios.post('http://localhost:3003/profileUser', idUser )
			.then((response)=> {
				console.log(response.data.results[0])
				setName(response.data.results[0].User_name)
				setIdade(response.data.results[0].idade)
				setDescricao(response.data.results[0].User_description)
			})
			.catch ((error) => {
				console.error('Erro ao enviar ou retono de dados para o backend:', error);
		})

		
		axios
			.post('http://localhost:3003/viewEventUser', idUser)
			.then((response) => {
				console.log(response)
				console.log(response.data.results[0].Nm_event);
				setEventData(response.data.results);
	
			})
			.catch((error) => {
				console.error('Erro ao enviar ou retono de dados para o backend:', error);
			});
			console.log(id);
			console.log(imgProfile);
	}, []);
	console.log(name);
	console.log(idade);
	console.log(descricao);

	return (
		<View style={styles.container}>

			<Image
				source={require("../assets/images/telap2.png")}
				style={styles.backgroundImage}
				resizeMode="cover"
			/>
			<View style={{ flexDirection: "row", justifyContent: "space-between", gap: 32, width: "100%" }}>
				<Backbutton />

				<Pressable style={styles.button} onPress={menu}>
					<View style={styles.bttbarra} />
					<View style={styles.bttbarra} />
					<View style={styles.bttbarra} />
				</Pressable>
			</View>

			<Modal
				transparent={true}
				visible={isMenuVisible}
				onRequestClose={closeMenu}>
				<TouchableWithoutFeedback onPress={closeMenu}>
					<View style={styles.modalBackground}>
						<Animatable.View
							style={styles.menuContainer}
							animation={isMenuVisible ? "slideInUp" : "slideInDown"}
							duration={250}>
							<Pressable
								style={styles.menubtt}
								onPress={bttDashboard}>
								<Text style={styles.menubtttext}>Dashboard</Text>
							</Pressable>
							<Pressable
								style={styles.menubtt}
								onPress={bttEventProgress}>
								<Text style={styles.menubtttext}>Eventos em andamentos</Text>
							</Pressable>
							<Pressable
								style={styles.menubtt}
								onPress={bttMyevent}>
								<Text style={styles.menubtttext}>Meus Eventos</Text>
							</Pressable>
							<Pressable
								style={styles.menubtt}
								onPress={bttReport}>
								<Text style={styles.menubtttext}>Report</Text>
							</Pressable>
							<Pressable
								style={styles.menubtt}
								onPress={() => console.log("Item 5 clicado")}>
								<Text style={styles.menubtttext}>Termos</Text>
							</Pressable>
							<Pressable
								style={styles.menubtt}
								onPress={bttSair}>
								<Text style={styles.menubtttext}>Sair</Text>
							</Pressable>
						</Animatable.View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>

			<View style={{marginTop: 40, marginBottom: 40}}>
				<View style={{ justifyContent: "space-between", gap: 20, flexDirection: "row" }}>
					<View style={styles.innerCircle}>
						{profileImage && (
							<Image
								source={`data:image/png;base64,${imgProfile}`}
								style={{ flex: 1, width: "100%", borderRadius: 105 }}
							/>
						)}
					</View>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Seguidores</Text>
						<Text style={styles.number}>0</Text>
					</View>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Seguindo</Text>
						<Text style={styles.number}>0</Text>
					</View>
				</View>

				<View style={styles.editButtonContainer}>
					<Pressable style={styles.editButton} onPress={handleButtonEdit}>
						<Text style={styles.editButtonText}>Editar perfil</Text>
					</Pressable>
				</View>

				{/* <View style={styles.line} /> */}
			</View>


			<View style={{marginTop: 40, marginBottom: 24, width: "100%", alignItems: "flex-start", gap: 8}}>
				<View style={{flexDirection: "row", alignItems: "center", gap: 4}}>
					<View>
						<Text style={styles.titulo}>{name}</Text>
					</View>

					<View>
						<Text style={styles.titulo1}>{idade} Anos</Text>
					</View>
				</View>

				<View style={styles.allContainerOne}>
					<View>
						<Text style={styles.descricao}>{descricao}</Text>
					</View>
				</View>
			</View>


			<Text style={styles.comentariosTitulo}>Meus eventos</Text>
			<ScrollView style={{width: "100%", gap: 16}}>

				<View style={{width: "100%", gap: 8, marginBottom: 120}}>
					{
						eventData.map((event,index) => {
							return (
								<CardEvent Event_image={event.Event_image} Nm_event={event.Nm_event} key={index}/>
							)
						})
					}
				</View>
			</ScrollView>

			{/* <Pressable
        style={styles.eventImagePlaceholder}
        onPress={handleEventImageClick}>
        <View style={styles.eventImagePlaceholderInner}>
          {eventImage && (
            <View style={{ width: "100%", height: 200 }}>
              <Image
                source={
                  params?.userImage
                    ? { uri: eventImage }
                    : require("../assets/images/icons/people(f).png")
                }
                style={{ width: "100%", height: "100%", borderRadius: 8 }}
              />
            </View>
          )}
        </View>
      </Pressable> */}
	  
		<Navbar id={id} imgProfile= {imgProfile}/>
		</View>
	);
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#260038",
		alignItems: "center",
		padding: 16,
	},


	innerCircle: {

		width: 90,
		height: 90,
		borderRadius: 105,
		backgroundColor: "#FFFFFF",
		overflow: "hidden",
	},

	textContainer: {
		position: "absolute",
		top: 0,
		right: 0,
	},

	textContainer1: {
		position: "absolute",
		top: 0,
		left: 0,
	},

	text: {
		color: "#FFFFFF",
		fontSize: 14,
	},

	backgroundImage: {
		flex: 1,
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
	},

	header: {
		flexDirection: "row",
		alignItems: "center",
		position: "absolute",
		top: windowHeight * 0.06,
		left: 30,
		zIndex: 1,
	},

	button: {
		backgroundColor: "transparent",
		width: 30,
	},

	bttbarra: {
		width: "100%",
		height: 4,
		backgroundColor: "#FFFFFF",
		borderRadius: 2,
		marginVertical: 3.5,
	},

	bottomImageContainer: {
		position: "absolute",
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "52%",
		backgroundColor: "transparent",
	},

	bottomImage: {
		width: Platform.OS === "web" ? "100%" : "108%",
		height: "100%",
	},

	modalContainer: {
		left: 12,
	},

	modalBackground: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "flex-end",
	},

	menuContainer: {
		backgroundColor: "#470F62",
		padding: 16,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},

	menubtt: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
	},

	menubtttext: {
		color: "#FFFFFF",
		fontSize: 18,
	},

	editButtonContainer: {
		alignItems: "center",
		marginTop: 64
	},

	editButton: {
		backgroundColor: "#7E3CA7",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
	},

	editButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "inter",
	},


	titulo: {
		color: "white",
		fontSize: 18,
		fontWeight: "inter",
	},



	titulo1: {
		color: "#919191",
		fontSize: 14,
		fontWeight: "inter",
	},


	descricao: {
		top: -10,
		color: "#919191",
		fontSize: 14,
		fontWeight: "inter",
		maxWidth: 300,
	},



	allContainerOne: {
		flexDirection: "row",
	},

	line: {
		left: 0,
		right: 0,
		bottom: 350,
		height: 2,
		backgroundColor: "white",
		opacity: 0.6,
	},

	comentariosTitulo: {
		color: "white",
		fontSize: 18,
		fontWeight: "800",
		textAlign: "left",
		alignItems: "flex-start",
		marginBottom: 24,
		width: "100%"
	},

	eventImagePlaceholder: {
		position: "absolute",
		width: 150,
		height: 100,
		bottom: 175,
		left: 12,
		borderRadius: 8,
		marginBottom: 16,
	},

	titlesContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},

	titleContainer: {
		alignItems: "center",
		marginHorizontal: 15,
	},

	title: {
		color: "white",
		fontSize: 14,
		opacity: 0.5,
	},

	number: {
		color: "#919191",
		fontSize: 16,
		fontWeight: "bold",
		marginTop: 5,
	},

	
});
