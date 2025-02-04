import { Navigate, Route, Routes } from 'react-router'
import { ImageEditor } from './components/ImageEditor'
import { ImageGallery } from './components/ImageGallery'
import { Layout } from './components/Layout'
import { NotFound } from './components/NotFound'
import { PageTitle } from './components/PageTitle'

export function App() {
  return (
    <Layout>
      <PageTitle />
      <Routes>
        <Route index element={<ImageGallery />} />
        <Route path="/edit-image" element={<Navigate to="/" replace />} />
        <Route path="/edit-image/:imageId" element={<ImageEditor />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
