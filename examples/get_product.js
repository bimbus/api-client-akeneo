import { params } from '../config/params'
import { AkeneoClient } from '../src/common/akeneo'

const client = new AkeneoClient(params)

client.authenticate().then(() => {
  const product = client.product('SAA002A')
  product.fetch().then(() => {
    // get label value for default locale
    console.log(product.attribute('label'))

    // get label value for es_ES locale (w/fallback to default)
    console.log(product.attribute('label'), 'es_ES')
  })
})
