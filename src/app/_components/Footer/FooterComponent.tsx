'use client'

import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import XIcon from '@mui/icons-material/X'
import Image from 'next/image'
import Link from 'next/link'

import logo from '../../../../public/logo.webp'

const FooterComponent = () => {
  return (
    <>
      <footer className="bg-white m-4">
        <div className="bg-white py-8 0 flex justify-around items-center mx-auto flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/4 flex ">
            <Image src={logo} alt="logo" className="mx-auto" />
          </div>
          <div className="w-1/6 hidden lg:block">
            <p>مكتبة الكترونية تهدف لتوفير الكتب العلمية والأدبية والدينية بأسعار مناسبة للجميع</p>
          </div>
          <div className=" flex justify-evenly w-full lg:w-2/4">
            <div>
              <h3 className="text-logo-500 font-semibold mb-4">تواصل معنا</h3>
              <p className="text-gray-600">قطر - الدوحة - جاسم بن حمد</p>
              <p className="text-gray-600">+974 7008 5441</p>
              <p className="text-gray-600">baitalelm.tec@gmail.com</p>
            </div>

            {/* About Section */}
            <div>
              <h3 className="text-logo-500 font-semibold mb-4">بيت العلم</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    من نحن
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    السياسة والخصوصية
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media Section */}
            <div>
              <h3 className="text-logo-500 font-semibold mb-4">تابعونا على</h3>
              <div className="flex justify-center md:justify-start gap-4">
                <a
                  href="https://www.facebook.com/bait.alelm"
                  className="text-gray-500 hover:text-gray-800"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://www.instagram.com/bait.alelm"
                  className="text-gray-500 hover:text-gray-800"
                >
                  <XIcon />
                </a>
                <a
                  href="https://www.instagram.com/bait.alelm"
                  className="text-gray-500 hover:text-gray-800"
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{' '}
            <a href="https://alrefa3ee.com/" className="hover:underline">
              Baitalelm
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  )
}
export default FooterComponent
