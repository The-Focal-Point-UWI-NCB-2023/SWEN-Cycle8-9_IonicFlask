//Line Items Fetch

async function fetchLineItems() {
    try {
        const fetchedLineItems = await getLineItems()
        setLineItems(fetchedLineItems)
    } catch (error) {
        console.error('Error fetching products:', error)
    }
}

async function fetchcreateLineItems(newLineItems: LineItems) {
    try {
        // Call your API to create the new product
        const createdOder = await createLineItems(newLineItems)
    } catch (error) {
        console.error('Error creating product:', error)
    }
}

async function fetchDeleteLineItems(LineItemsID: string) {
    try {
        // Call your API to create the new product
        const deletedLineItems = await deleteLineItems(LineItemsID)
    } catch (error) {
        console.error('Error creating product:', error)
    }
}

async function fetchUpdateProduct(
    LineItemsID: string,
    newLineItems: LineItems
) {
    try {
        // Call your API to create the new product
        const updatedLineItems = await updateLineItems(
            LineItemsID,
            newLineItems
        )
    } catch (error) {
        console.error('Error creating product:', error)
    }
}

async function fetchLineItemsById(LineItemsID: string) {
    try {
        // Call your API to create the new product
        const fetchedLineItemsByID = await getLineItemsById(LineItemsID)
    } catch (error) {
        console.error('Error creating product:', error)
    }
}
