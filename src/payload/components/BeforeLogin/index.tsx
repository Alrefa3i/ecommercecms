import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div>
      <p>
        <b>مرحبا بك في لوحة التحكم</b>
        {' هذا هو المكان الذي سيسجل فيه مسؤولو الموقع الدخول لإدارة متجرك. سيحتاج العملاء إلى '}
        <a href={`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/login`}>
          تسجيل الدخول إلى الموقع بدلاً من ذلك
        </a>
        {' للوصول إلى حساب المستخدم الخاص بهم، تاريخ الطلبات، والمزيد.'}
      </p>
    </div>
  )
}

export default BeforeLogin
