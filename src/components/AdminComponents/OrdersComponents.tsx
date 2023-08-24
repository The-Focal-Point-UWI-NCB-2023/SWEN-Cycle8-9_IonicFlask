import { IonCol, IonRow } from "@ionic/react"
import { order_headers } from "../../pages/Admin/AdminFunctions"
import styles from "./AdminComponents.module.scss"
import { Order, getOrders } from "../../util/api/models/orders";
import { useEffect, useState } from "react";
import {LineItem,createLineItem,deleteLineItem,getLineItemById,getLineItems,updateLineItem,} from '../../util/api/models/line_items'
import { test_orders } from "../../pages/Admin/AdminFunctions";

export const AdminOrders: React.FC = () => {

const [orderList, setOrders] = useState<Order[]>([])
const [lineitmes, setLineItems] = useState<LineItem>()

    useEffect(() => {
        fetchOrders()
        
    }, [])
    //Orders Fetch

    async function fetchOrders() {
        try {
            const fetchedOrders = await getOrders()
            setOrders(fetchedOrders)
        } catch (error) {
            console.error('Error fetching orders:', error)
        }
    }

    //Line Items Fetch

    async function fetchLineItems() {
        try {
            const fetchedLineItems = await getLineItems()
            setLineItems(fetchedLineItems)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    async function fetchcreateLineItem(newLineItems: LineItem) {
        try {
            // Call your API to create the new product
            const createdOder = await createLineItem(newLineItems)
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

    async function fetchDeleteLineItem(LineItemsID: string) {
        try {
            // Call your API to create the new product
            const deletedLineItems = await deleteLineItem(LineItemsID)
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

    async function fetchUpdateLineItem(
        LineItemsID: string,
        newLineItems: LineItem
    ) {
        try {
            // Call your API to create the new product
            const updatedLineItems = await updateLineItem(
                LineItemsID,
                newLineItems
            )
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

    async function fetchLineItemById(LineItemsID: string) {
        try {
            // Call your API to create the new product
            const fetchedLineItemsByID = await getLineItemById(LineItemsID)
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

    return (
        <>
           <IonRow className={styles.headerRow}>
                            {order_headers.map((header, index) => (
                                <IonCol
                                    size-sm="2"
                                    key={`header_${index}`}
                                    className={styles.headerCol}
                                >
                                    {header
                                        .split('_')
                                        .map(
                                            (word) =>
                                                word.charAt(0).toUpperCase() +
                                                word.slice(1)
                                        )
                                        .join(' ')}
                                </IonCol>
                            ))}
                        </IonRow>

                        {orderList.slice(0,-1).map((order, rowIndex) => (
                            <IonRow
                                key={`user_${rowIndex}`}
                                className={styles.userRow}
                            >
                                <div className={styles.orderInfo}>
                                    {order_headers.map((header) => (
                                        <IonCol
                                            size="2"
                                            size-sm="2"
                                            size-md="2"
                                            size-lg="2"
                                            key={`col_${rowIndex}_${header}`}
                                        >
                                            {header === 'total_amount'
                                                ? `$${order[header]}`
                                                : header === 'line_items'
                                                ? order[header].map((lineItem, lineIndex) => (
                                                    <div key={`line_${lineIndex}`}>
                                                        Product ID: {lineItem.product_id}, Quantity: {lineItem.qty}
                                                    </div>
                                                ))
                                                : order[header]}{' '}
                                        </IonCol>
                                    ))}
                                </div>
                            </IonRow>
                        ))}
        </>
    )
}
