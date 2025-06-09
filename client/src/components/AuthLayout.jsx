
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';

const AuthLayout = ({ children, title, description }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br ">
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-4xl"
      >
        <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-2xl border-none">
            <div className="relative p-8">
              <motion.div 
                className="absolute inset-0 opacity-10 -z-10"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'52\' height=\'26\' viewBox=\'0 0 52 26\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z\' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "linear"
                }}
              />
              <div className="text-center mb-8">
                <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent TitleForm">
                  {title}
                </h1>
                {description && <p className="text-2xl text-muted-foreground mt-2">{description}</p>}
              </div>
              {children}
            </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
  