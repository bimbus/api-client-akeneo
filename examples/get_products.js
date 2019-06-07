import { params } from '../config/params'
import { AkeneoClient } from '../src/common/akeneo'

const client = new AkeneoClient(params)

client.authenticate().then(() => {
  // create cursor on products
  const cursor = client.cursor('products')
  // fetch data set
  cursor.get().then(() => {
    console.log(cursor.getItems(), cursor.page)

    // fetch next dataset and use returned items
    cursor.next().then((items) => {
      console.log(items, cursor.page)

      // fetch previous data set and use items later
      cursor.prev().then(() => {
        console.log(cursor.getItems(), cursor.page)
      })
    })
  })
})
