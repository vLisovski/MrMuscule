import {Card, Image} from "antd";
import Meta from "antd/es/card/Meta";
import {ShoppingCartOutlined, StarOutlined} from "@ant-design/icons";
import LocalStorageWorker from "../../storage/LocalStorageWorker";

const ShopItems = (props) => {

    let localStorageWorker = new LocalStorageWorker();

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
            <Meta
                bodyStyle={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignContent: "flex-start"
                }}
                title={item.name}
                description={item.description}/>
        </Card>)
    })
};

function pushActions(localStorageWorker, id, props) {

    let actions

    if (localStorageWorker.get("token") != null) {
        if (props.favorite.includes(id)) {
            actions = [<ShoppingCartOutlined onClick={() => {
            }} key="cart"/>, <StarOutlined style={{color: "yellow"}} onClick={() => {
                deleteFromFavorite(props, id)
            }} key="favorite"/>]
        } else {
            actions = [<ShoppingCartOutlined onClick={() => {
            }} key="cart"/>, <StarOutlined style={{color: "black"}} onClick={() => {
                addToFavorite(props, id)
            }} key="favorite"/>]
        }
    } else {
        actions = [<ShoppingCartOutlined onClick={() => {
        }} key="cart"/>]
    }

    return actions
}

function addToCart(props, id) {
    props.setCart([...props.cart, id])
}

function addToFavorite(props, id) {
    props.setFavorite([...props.favorite, id])
}

function deleteFromFavorite(props, id){

    let favorites = props.favorite.filter((item) =>  {return item !== id} )

    props.setFavorite(favorites)

}

export default ShopItems;