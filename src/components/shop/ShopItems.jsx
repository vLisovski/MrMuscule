import {Card, Image, Skeleton} from "antd";
import Meta from "antd/es/card/Meta";
import {ShoppingCartOutlined, StarOutlined} from "@ant-design/icons";
import LocalStorageWorker from "../../storage/LocalStorageWorker";
import UsersApiWorker from "../../api/user/UsersApiWorker";
import CartApi from "../../api/cart/CartApi";
import {useEffect, useState} from "react";

const ShopItems = (props) => {

    let localStorageWorker = new LocalStorageWorker();
    let loading = props.loading
    let [actions, setActions] = useState()

    const pushAction = (item) => {
        let actions
        if (localStorageWorker.get("token") != null && props.favorite.length > 0) {
            console.log("IFIFIFFIIFFIFIFIFIF")
            if (props.favorite.includes(item.id)) {
                if (props.cart.includes(item.id)) {
                    actions = [<>Товар в корзине</>, <StarOutlined style={{color: "yellow"}} onClick={() => {
                        deleteFromFavorite(props, item.id)
                    }} key="favorite"/>]
                } else {
                    actions = [<ShoppingCartOutlined onClick={() => {
                        addToCart(props, item.id)
                    }} key="cart"/>, <StarOutlined style={{color: "yellow"}} onClick={() => {
                        deleteFromFavorite(props, item.id)
                    }} key="favorite"/>]
                }
            } else {
                if (props.cart.includes(item.id)) {
                    actions = [<>Товар в корзине</>, <StarOutlined style={{color: "black"}} onClick={() => {
                        addToFavorite(props, item.id)
                    }} key="favorite"/>]
                } else {
                    actions = [<ShoppingCartOutlined onClick={() => {
                        addToCart(props, item.id)
                    }} key="cart"/>, <StarOutlined style={{color: "black"}} onClick={() => {
                        addToFavorite(props, item.id)
                    }} key="favorite"/>]
                }
            }
        } else {
            console.log("ELSEELSEELSELSELSELSLELE")
            console.log("FAVORITE"+props.favorite)
            if (localStorageWorker.get("cart").split(",").includes(`${item.id}`)) {
                if(props.favorite[0]==null){
                    actions = [<>Товар в корзине</>]
                }else{
                    actions = [<>Товар в корзине</>, <StarOutlined style={{color: "black"}} onClick={() => {
                        addToFavorite(props, item.id)
                    }} key="favorite"/>]
                }

            } else {
                if(props.favorite[0]==null){
                    actions = [<ShoppingCartOutlined onClick={() => {

                        let cart = localStorageWorker.get("cart").split(",")

                        if (cart[0] === '') {
                            cart[0] = item.id
                        } else {
                            cart.push(item.id)
                        }
                        localStorageWorker.save("cart", cart)
                        props.setCart(cart)
                    }} key="cart"/>]
                }else{
                    actions = [<ShoppingCartOutlined onClick={() => {

                        let cart = localStorageWorker.get("cart").split(",")

                        if (cart[0] === '') {
                            cart[0] = item.id
                        } else {
                            cart.push(item.id)
                        }
                        localStorageWorker.save("cart", cart)
                        props.setCart(cart)
                    }} key="cart"/>, <StarOutlined style={{color: "black"}} onClick={() => {
                        addToFavorite(props, item.id)
                    }} key="favorite"/>]
                }
            }
        }
        return actions
    }

    useEffect(()=>{

    },[props.cart])

    return props.cards.map((item) => {
        return (<Card
            key={item.id}
            style={{
                background: 'white',
                marginTop: '30px',
                marginLeft: '8px',
                width: "250px",
            }}
            actions={pushAction(item)}
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
                    description={<>
                        <p style={{color: "black"}}>{item.description}</p>
                        <p style={{color: "blue"}}>{item.price}₽</p>
                        <p style={{color: "green"}}>+{item.bonuses}Б</p>
                    </>}/>
            </Skeleton>
        </Card>)
    })
};

function pushActions(localStorageWorker, id, props) {
    let local = new LocalStorageWorker()
    let actions
    if (localStorageWorker.get("token") != null && props.favorite.length > 0) {
        if (props.favorite.includes(id)) {
            if (props.cart.includes(id)) {
                actions = [<>Товар в корзине</>, <StarOutlined style={{color: "yellow"}} onClick={() => {
                    deleteFromFavorite(props, id)
                }} key="favorite"/>]
            } else {
                actions = [<ShoppingCartOutlined onClick={() => {
                    addToCart(props, id)
                }} key="cart"/>, <StarOutlined style={{color: "yellow"}} onClick={() => {
                    deleteFromFavorite(props, id)
                }} key="favorite"/>]
            }
        } else {
            if (props.cart.includes(id)) {
                actions = [<>Товар в корзине</>, <StarOutlined style={{color: "black"}} onClick={() => {
                    addToFavorite(props, id)
                }} key="favorite"/>]
            } else {
                actions = [<ShoppingCartOutlined onClick={() => {
                    addToCart(props, id)
                }} key="cart"/>, <StarOutlined style={{color: "black"}} onClick={() => {
                    addToFavorite(props, id)
                }} key="favorite"/>]
            }
        }
    } else {
        if (props.cart.includes(id)) {
            actions = [<>Товар в корзине</>]
        } else {
            actions = [<ShoppingCartOutlined onClick={() => {

                let cart = local.get("cart").split(",")

                if (cart[0] === '') {
                    cart[0] = id
                } else {
                    cart.push(id)
                }
                console.log("CART SHOP ITEMS" + cart)
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
    }, local.get("token"))
        .then(response => {
            if (response.data === 0) {
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
    }, local.get("token")).then(() => props.setFavorite([...props.favorite, id])).catch(error => {
        console.log(error)
    })
}

function deleteFromFavorite(props, id) {

    let userApi = new UsersApiWorker()
    let local = new LocalStorageWorker()

    userApi.deleteFavorite({
        userId: local.get("userid"),
        productId: id
    }, local.get("token")).then(() => {
        let favorites = props.favorite.filter((item) => {
            return item !== id
        })
        props.setFavorite(favorites)
    }).catch(error => {
        console.log(error)
    })

}

export default ShopItems;