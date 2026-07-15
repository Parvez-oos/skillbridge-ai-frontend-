'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container } from '@/components/ui/Container';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, Clock, Send, MessageSquare } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please provide a valid email'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    content: 'contact@skillbridge.ai',
    description: 'We respond within 24 hours',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: MapPin,
    title: 'Location',
    content: 'San Francisco, CA',
    description: 'Remote-first company',
    color: 'text-info',
    bg: 'bg-info/10',
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '+1 (555) 123-4567',
    description: 'Mon-Fri 9am-6pm PT',
    color: 'text-success',
    bg: 'bg-success/10',
  },
  {
    icon: Clock,
    title: 'Hours',
    content: '24/7 Support',
    description: 'AI-powered assistance',
    color: 'text-warning',
    bg: 'bg-warning/10',
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form submitted:', data);
    setSubmitted(true);
    setIsSubmitting(false);
    reset();
  };

  return (
    <div>
      <Section className="bg-gradient-to-b from-primary/5 to-transparent pt-24 md:pt-32">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We would love to hear from you. Send us a message and we will respond as soon as possible.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. We will get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Name
                        </label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          className={errors.name ? 'border-destructive' : ''}
                          {...register('name')}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className={errors.email ? 'border-destructive' : ''}
                          {...register('email')}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        placeholder="How can we help?"
                        className={errors.subject ? 'border-destructive' : ''}
                        {...register('subject')}
                      />
                      {errors.subject && (
                        <p className="mt-1.5 text-xs text-destructive">{errors.subject.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more..."
                        className={`h-32 ${errors.message ? 'border-destructive' : ''}`}
                        {...register('message')}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-destructive">{errors.message.message}</p>
                      )}
                    </div>
                    <Button type="submit" loading={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="p-5 rounded-2xl border border-border/50 bg-card/50 hover:bg-card hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl ${info.bg} transition-transform duration-300 group-hover:scale-110 shrink-0`}>
                      <info.icon className={`w-5 h-5 ${info.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{info.title}</h3>
                      <p className="text-muted-foreground text-sm">{info.content}</p>
                      <p className="text-xs text-muted-foreground/70 mt-0.5">{info.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
