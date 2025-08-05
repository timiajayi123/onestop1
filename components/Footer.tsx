import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 md:px-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-semibold text-lg mb-3">Company</h4>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/careers" className="hover:underline">Careers</a></li>
            <li><a href="/blog" className="hover:underline">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-3">Product</h4>
          <ul className="space-y-2">
            <li><a href="/features" className="hover:underline">Features</a></li>
            <li><a href="/pricing" className="hover:underline">Pricing</a></li>
            <li><a href="/docs" className="hover:underline">Documentation</a></li>
            <li><a href="/roadmap" className="hover:underline">Roadmap</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-3">Support</h4>
          <ul className="space-y-2">
            <li><a href="/help" className="hover:underline">Help Center</a></li>
            <li><a href="/faq" className="hover:underline">FAQs</a></li>
            <li><a href="/terms" className="hover:underline">Terms</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-3">Connect</h4>
          <div className="flex space-x-4 mt-2">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaInstagram /></a>
          </div>
          <p className="text-xs mt-4">&copy; {new Date().getFullYear()} OneStop Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
