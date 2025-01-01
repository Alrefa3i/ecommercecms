import React from 'react'
import { Link } from 'react-router-dom'
import { Banner } from 'payload/components'

import { SeedButton } from './SeedButton'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>مرحبًا بك في لوحة التحكم الخاصة بك!</h4>
      </Banner>
      إليك ما يجب فعله بعد ذلك:
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton />
          {' مع بعض المنتجات والصفحات لبدء مشروعك الجديد، ثم '}
          <a href="/">قم بزيارة موقعك الإلكتروني</a>
          {' لرؤية النتائج.'}
        </li>

        <li>
          <Link to="/admin/collections/products">ادارة كل منتجاتك</Link>
          {' عن طريق اختيار المنتجات من القائمة المنسدلة'}
          <i>تفاصيل المنتج</i>.
        </li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
