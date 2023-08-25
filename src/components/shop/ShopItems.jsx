import {Card, Image, Skeleton} from "antd";
import Meta from "antd/es/card/Meta";
import {ShoppingCartOutlined, StarOutlined} from "@ant-design/icons";
import LocalStorageWorker from "../../storage/LocalStorageWorker";
import UsersApiWorker from "../../api/user/UsersApiWorker";
import CartApi from "../../api/cart/CartApi";

const ShopItems = (props) => {

    let localStorageWorker = new LocalStorageWorker();
    let loading = props.loading

    return props.cards.map((item) => {
        return (<Card
            key={item.id}
            style={{
                background: 'white',
                marginTop: '30px',
                marginLeft: '8px',
                width: "250px",
            }}
            actions={pushActions(localStorageWorker, item.id, props)}
            size={"default"}
            hoverable
            bordered={true}
            cover={<Image alt="inventory" style={{alignSelf: "center"}} width={250} src={item.photoPath}/>}
        >
            <Skeleton loading={loading} avatar active>
            <Meta
                bodyStyle={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignContent: "flex-start"
                }}
                title={item.name}
                description={item.description}/>
            </Skeleton>
        </Card>)
    })
};

function pushActions(localStorageWorker, id, props) {
    let local = new LocalStorageWorker()
    let actions
    if (localStorageWorker.get("token") != null && props.favorite.length>0) {
        if (props.favorite.includes(id)) {
            if(props.cart.includes(id)){
                actions = [<>Товар в корзине</>,<StarOutlined style={{color: "yellow"}} onClick={() => {
                    deleteFromFavorite(props, id)
                }} key="favorite"/>]
            }else{
                actions = [<ShoppingCartOutlined onClick={() => {
                    addToCart(props, id)
                }} key="cart"/>, <StarOutlined style={{color: "yellow"}} onClick={() => {
                    deleteFromFavorite(props, id)
                }} key="favorite"/>]
            }
        } else {
            if(props.cart.includes(id)){
                actions = [<>Товар в корзине</>,<StarOutlined style={{color: "black"}} onClick={() => {
                    addToFavorite(props, id)
                }} key="favorite"/> ]
            }else {
                actions = [<ShoppingCartOutlined onClick={() => {
                    addToCart(props, id)
                }} key="cart"/>, <StarOutlined style={{color: "black"}} onClick={() => {
                    addToFavorite(props, id)
                }} key="favorite"/>]
            }
        }
    } else {
        if(props.cart.includes(id)){
            actions = [<>Товар в корзине</>]
        }else{
            actions = [<ShoppingCartOutlined onClick={() => {
                console.log(local.get("cart"))

                let cart =  local.get("cart").split(",")

                if(cart[0]===''){
                    cart[0] = id
                }else{
                    cart.push(id)
                }

                local.save("cart", cart)
                props.setCart(cart)
            }} key="cart"/>]
        }
    }

    return actions
}

function addToCart(props, id) {

    let cartApi = new CartApi()
    let local = new LocalStorageWorker()

    props.setCart([...props.cart, id])
    cartApi.addProduct({
        userId: local.get("userid"),
        productId: id
    },local.get("token"))
        .then(response => {
            if(response.data===0){
                alert("такой продукт уже есть в корзине")
            }
        })
        .catch(error => {
            local.save("location", window.location.href)
            props.navigation("/authorization")
            console.log(error)
        })

}

function addToFavorite(props, id) {

    let userApi = new UsersApiWorker()
    let local = new LocalStorageWorker()
    userApi.addFavorite({
        userId: local.get("userid"),
        productId: id
    },local.get("token")).then(() => props.setFavorite([...props.favorite, id])).catch(error => {console.log(error)})
}

function deleteFromFavorite(props, id){

    let userApi = new UsersApiWorker()
    let local = new LocalStorageWorker()

    userApi.deleteFavorite({
        userId: local.get("userid"),
        productId: id
    },local.get("token")).then(() => {
        let favorites = props.favorite.filter((item) =>  {return item !== id} )
        props.setFavorite(favorites)
    }).catch(error => {console.log(error)})

}

export default ShopItems;