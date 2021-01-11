const globalStyles = {
  CatContainer: {
    flexDirection: "row",
    marginTop: 10,
    borderWidth: 0,
    height: 50,
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 15,
    borderRadius: 10,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0,
  },
};

const ListStyles = {
  container: {
    flexDirection: "row",
    flex: 1,
  },
  subcontainer: {
    borderLeftColor: "grey",
    borderLeftWidth: 0,
    flex: 1,
    marginHorizontal: 2,
    paddingHorizontal: 4,
  },
  image: {
    marginHorizontal: 5,
    width: 90,
    height: 70,
    borderRadius: 4,
    marginBottom: 5,
    alignSelf: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  detail: {
    fontSize: 12,
    fontStyle: "normal",
    alignSelf: "flex-start",
  },
  tanggal: {
    fontSize: 10,
    fontStyle: "italic",
    alignSelf: "flex-end",
  },
};
const colorTheme = {
  primary: "#3D91D8",
  pLight: "#3D91D5",
  pDark: "#3D91D1",
  text: "#000000",
};
const ButtonColors = {
  primary: "#0275d8",
  success: "#5cb85c",
  info: "#5bc0de",
  warning: "#f0ad4e",
  danger: "#d9534f",
};
export { globalStyles, ListStyles, colorTheme, ButtonColors };
