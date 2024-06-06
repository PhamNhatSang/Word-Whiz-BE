import { ExpressMiddlewareInterface } from 'routing-controllers';
import multer from 'multer'

export class UploadMidleware implements ExpressMiddlewareInterface {

  use(request: any, response: any, next?: (err?: any) => any): any {
    const storage = multer.memoryStorage()
    const upload = multer({ storage: storage })
    const single = upload.single('file')
    single(request, response, (err: any) => {
      if (err) {
        return response.status(400).json({ message: err.message })
      }
      next()
    }
    )
  }
}