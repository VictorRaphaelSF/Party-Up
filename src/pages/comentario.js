import React, { useEffect, useState } from "react";
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
	TextInput,
	ScrollView
} from "react-native";

import * as Animatable from "react-native-animatable";
import { useNavigation, useRoute } from "@react-navigation/native";
import Backbutton from "../components/backbutton";
import axios from 'axios';

export default function Comentario() {
	const navigation = useNavigation();
	const [isMenuVisible, setMenuVisible] = useState(false);
	const [profileImage, setProfileImage] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [imgProfile, setImgProfile] = useState("");
	const [name, setName] = useState("");
	const [descComentario, setDescComentario] = useState("");
	const [comentarios, setComentarios] = useState([]);
	const [error, setError] = useState("");

	const menu = () => {
		setMenuVisible(true);
	};

	const closeMenu = () => {
		setMenuVisible(false);
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

	const bttTermos = () => {
		navigation.navigate('acesstermos');
	};

	const handleUserImagePress = () => {
		console.log("Botão perfil adicionado")
	};

	const route = useRoute();
	const { id } = route.params;
	const { idEvento } = route.params;


	const idEvent = {
		Id_App_Events_code: idEvento
		
	};

	const comentario = {
		Id_App_Events_code: idEvento,
		idUser_code: id,
		commentUser: searchTerm
	}


	useEffect(() => {
		console.log(idEvent);
		axios
			.post('http://localhost:3003/viewComment2', idEvent)
			.then((response) => {
				console.log(response);
				setComentarios(response.data.results)
				setError(response.data.msg)

				// setProfileImage(response.data.image_url);
			})
			.catch((error) => {
				console.error('Erro ao enviar ou retono de dados para o backend:', error);
			});

	}, [searchTerm]);
	console.log(comentarios);

	const enviarComentario = async (event) => {
		event.preventDefault();
		// try {
		//   const response = await axios.post('commentEvent', comentario);
		//   setComentarios([...comentarios, { perfil: imgProfile, nome: name, comentario: descComentario }]);
		//   setDescComentario(""); 
		//   console.log('Comentário enviado com sucesso:', response.data);
		// } catch (error) {
		//   console.error('Erro ao enviar o comentário:', error);
		// }
		if (searchTerm != "") {
			axios
				.post('http://localhost:3003/commentEvent', comentario)
				.then((response) => {
					console.log(response);
					setSearchTerm("")
				})
				.catch((error) => {
					console.error('Erro ao enviar os dados para o backend:', error);

				});
		}
	};

    const backbutton = () => {
        navigation.goBack();
      };

	return (
		<View style={styles.container}>
			<View style={styles.bottomImageContainer}>
				<Image
					source={require("../assets/images/img_borda_inicio.png")}
					style={styles.bottomImage}
				/>
			</View>
			<View style={styles.headerOficial}>
				<Pressable style={styles.backButton} onPress={backbutton}>
					<Image
						source={require("../assets/images/icons/backicon.png")}
						style={styles.backIcon}
					/>
				</Pressable>
				<View style={styles.header}>
					<Text style={styles.title}>Comentarios</Text>
				</View>

				<Pressable style={styles.button} onPress={menu}>
					<View style={styles.bttbarra}></View>
					<View style={styles.bttbarra}></View>
					<View style={styles.bttbarra}></View>
				</Pressable>
			</View>
				{/* <View style={styles.linha}></View> */}

			{/* <ScrollView style={{ width: "100%", gap: 16, top: 10, maxHeight: "77%" }}>
				<View style={styles.allContainer}>
					<View style={styles.topUser}>
						<Pressable onPress={handleUserImagePress}>
							<Image
								source={`data:image/png;base64,${imgProfile}`}
								style={styles.userImage}
							/>
							<Text style={styles.titulo1}>{name}</Text>
						</Pressable>
					</View>
					<View style={styles.nameContainer}>
						<Text style={styles.titulo}>{descComentario}</Text>
					</View>
				</View>
			</ScrollView> */}

			{/* {comentarios.length !== 0 &&
        comentarios.map((comentario, index) => (
          <View
            key={index}
            style={[
              styles.allContainer,
              { top: windowHeight * 0.212 + index * 100 },
            ]}
          >
                <View style={styles.topUser}>
                  <Pressable onPress={handleUserImagePress}>
                    <Image
                      source={{ uri: `data:image/png;base64,${comentario.User_image}` }}
                      style={styles.userImage}
                    />
                    <Text style={styles.titulo1}>{comentario.User_name}</Text>
                  </Pressable>
                </View>
                <View styles={styles.nameContainer}>
                  <Text style={styles.titulo}>{comentario.Info_content}</Text>
                </View>
              </View>
            ))}   */}

			<ScrollView
				style={{ width: "100%" }}>
				{comentarios ?
					(<View style={{ width: "100%", gap: 8 }}>
						{
							comentarios.map((comentario, index) => (
								<View key={index} style={styles.allContainer}>
									<View style={styles.topUser}>
										<Pressable onPress={handleUserImagePress}>
											<View style={styles.innerCircle}>
												<Image
													source={`data:image/png;base64,${comentario.User_image}`}
													style={{ flex: 1, width: "100%", borderRadius: 50 }}
												/>
											</View>
										</Pressable>
										<Text style={styles.titulo1}>{comentario.User_name}</Text>
									</View>
									<View styles={styles.nameContainer}>
										<Text style={styles.titulo}>{comentario.Info_content}</Text>
									</View>
								</View>
							))}
					</View>) :
					(error && <Text style={styles.searchHistoryItem}>{error}</Text>)
				}
			</ScrollView>
			{/* <ScrollView
        style={{ width: "100%", gap: 16, top: 10, maxHeight: "77%" }}>
        {eventResult ?
          (<View style={{width: "100%", gap: 8}}>
					{
            
						eventData.map((event,index) => {
							return (
								<CardEventUser descricaoEvento={event.desc_event} idUser={id} Event_image={event.Event_image} Nm_event={event.Nm_event} Id_App_Events={event. Id_App_Events} key={index}/>
							)
						})
					}
				  </View>):
          (error && <Text style={styles.searchHistoryItem}>{error}</Text>)}
				</ScrollView> */}

			<View style={styles.searchBarContainer}>
				<Pressable onPress={enviarComentario}>
					<Image
						source={require("../assets/images/icons/msgicon.png")}
						style={styles.icon}
					/>
				</Pressable>
				<TextInput
					style={styles.searchInput}
					placeholder="Comentar"
					placeholderTextColor="rgba(255, 255, 255, 0.5)"
					underlineColorAndroid="transparent"
					value={searchTerm}
					onChangeText={setSearchTerm}
					onSubmitEditing={enviarComentario}
					maxLength={180}
				/>
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
								onPress={bttTermos}>
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
		</View>
	);
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#260038",
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},

	header: {
		flexDirection: "row",
		alignItems: "center",
		bottom: 8,
	},

	title: {
		fontSize: 19,
		color: "#FFFFFF",
	},

	searchHistoryItem: {
		color: "#FFFFFF",
		fontSize: 16,
		marginVertical: 5,
	},

	linha: {
		width: Platform.OS === "web" ? "100%" : "108%",
		height: 1,
		backgroundColor: "#FFFFFF",
	},

	button: {
		justifyContent: "center",
		backgroundColor: "transparent",
		width: 30,
		height: 18,
		bottom: 8,
	},

	searchBarContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#582C74",
		padding: 12,
		borderRadius: 20,
		width: "100%"
	},

	searchInput: {
		color: "#FFFFFF",
		fontSize: 16,
		flex: 1,
		paddingLeft: 10,
		borderRadius: 5,
		outlineWidth: 0,
	},

	icon: {
		width: 23,
		height: 23,
		marginRight: 12,
		left: 2,
	},

	bttbarra: {
		width: 31,
		height: 4,
		backgroundColor: "#FFFFFF",
		borderRadius: 2,
		marginVertical: 3.5,
	},

	innerCircle: {
		width: 45,
		height: 45,
		borderRadius: 105,
		backgroundColor: "#FFFFFF",
		overflow: "hidden",
	},

	bottomImageContainer: {


		justifyContent: "center",
		alignItems: "center",

		backgroundColor: "transparent",
	},

	bottomImage: {
		width: Platform.OS === "web" ? "100%" : "108%",
		height: "100%",
	},

	modalBackground: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "flex-end",
	},

	allContainer: {
		flexDirection: 'column',
		marginBottom: 24
	},

	nameContainer: {
	},

	titulo: {
		color: "white",
		fontSize: 14,
		fontWeight: "inter",
		opacity: 0.8,
		marginTop: 4
	},

	menuContainer: {
		backgroundColor: "#470F62",
		padding: 16,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},

	topUser: {
		flexDirection: "row",
		gap: 12
	},

	userImage: {
		width: 45,
		height: 45,
		borderRadius: 25,
		backgroundColor: "black",
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

	nameContainer: {
	},

	titulo1: {
		color: "white",
		fontSize: 18,
		fontWeight: "inter",
	},

	backButton: {
		bottom: 8,
      },
    
      backIcon: {
        width: 30,
        height: 24,
      },

	  headerOficial: {
		flexDirection: "row", 
		justifyContent: "space-between", 
		alignItems: "center", 
		width: "100%", 
		top: 24,
		marginBottom: 50, 
		borderBottomWidth: 2, 
		borderBottomColor: "#fff", 
		paddingBottom: 12
	}
});