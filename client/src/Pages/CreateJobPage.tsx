import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, Textarea, Button, Select, MultiSelect, Paper, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';

interface Company {
  id: number;
}

interface CreateJobForm {
  title: string;
  description: string;
  location: string;
  responsibilities: string;
  qualifications: string;
  skills: string[];
  company?: Company;
}

const initialFormState: CreateJobForm = {
  title: '',
  description: '',
  location: '',
  responsibilities: '',
  qualifications: '',
  skills: []
};

const skillOptions = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'Java',
  'Spring Boot',
  'SQL',
  'MongoDB',
  'AWS',
  'Docker',
  'Kubernetes',
  'Machine Learning',
  'Data Science',
  'UI/UX Design',
  'Project Management'
];

const locationOptions = [
  'Dhaka, Bangladesh',
  'Chittagong, Bangladesh',
  'Sylhet, Bangladesh',
  'Remote'
];

const CreateJobPage = () => {
  const [form, setForm] = useState<CreateJobForm>(initialFormState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const companyId = 1;
      const baseUrl = import.meta.env.DEV ? 'http://localhost:8080' : '';
      const url = `${baseUrl}/api/jobs/company/${companyId}`;

      const jobData = {
        title: form.title,
        description: form.description,
        location: form.location,
        responsibilities: form.responsibilities,
        qualifications: form.qualifications,
        skills: form.skills || [],
        company: {
          id: companyId
        }
      };
      
      
      console.log('Making request to:', url);
      console.log('Request payload:', JSON.stringify(jobData, null, 2));

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin
        },
        body: JSON.stringify(jobData),
        credentials: 'include'
      });
      
      console.log('Response received:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        let errorMessage = '';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || JSON.stringify(errorData);
          } else {
            errorMessage = await response.text() || 'An unknown error occurred';
          }
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
          errorMessage = 'Failed to parse error response';
        }

        console.error('Server Error:', {
          url,
          status: response.status,
          statusText: response.statusText,
          error: errorMessage
        });
        
        throw new Error(`Failed to create job: ${errorMessage}`);
      }

      notifications.show({
        title: 'Success',
        message: 'Job posted successfully!',
        color: 'green'
      });

      navigate('/posted-jobs');
    } catch (error) {
      console.error('Error creating job:', error);
      const message = error instanceof Error ? error.message : 'Failed to create job. Please try again.';
      notifications.show({
        title: 'Error',
        message,
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof CreateJobForm) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-mine-shaft-950 py-12 px-4 sm:px-6 lg:px-8">
      <Paper 
        className="max-w-3xl mx-auto p-8 bg-mine-shaft-900 border border-mine-shaft-700"
        radius="lg"
      >
        <Title order={2} className="text-center mb-8 text-white">
          Create New Job Posting
        </Title>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextInput
            required
            label="Job Title"
            placeholder="e.g., Senior Software Engineer"
            value={form.title}
            onChange={handleChange('title')}
            classNames={{
              input: 'bg-mine-shaft-800 border-mine-shaft-700 text-white',
              label: 'text-gray-300'
            }}
          />

          <Select
            required
            label="Location"
            placeholder="Select job location"
            data={locationOptions}
            value={form.location}
            onChange={(value) => setForm(prev => ({ ...prev, location: value || '' }))}
            classNames={{
              input: 'bg-mine-shaft-800 border-mine-shaft-700 text-white',
              label: 'text-gray-300',
              dropdown: 'bg-mine-shaft-800'
            }}
          />

          <Textarea
            required
            label="Job Description"
            placeholder="Provide a detailed description of the role"
            minRows={4}
            value={form.description}
            onChange={handleChange('description')}
            classNames={{
              input: 'bg-mine-shaft-800 border-mine-shaft-700 text-white',
              label: 'text-gray-300'
            }}
          />

          <Textarea
            required
            label="Responsibilities"
            placeholder="List the key responsibilities"
            minRows={4}
            value={form.responsibilities}
            onChange={handleChange('responsibilities')}
            classNames={{
              input: 'bg-mine-shaft-800 border-mine-shaft-700 text-white',
              label: 'text-gray-300'
            }}
          />

          <Textarea
            required
            label="Qualifications"
            placeholder="List required qualifications and experience"
            minRows={4}
            value={form.qualifications}
            onChange={handleChange('qualifications')}
            classNames={{
              input: 'bg-mine-shaft-800 border-mine-shaft-700 text-white',
              label: 'text-gray-300'
            }}
          />

          <MultiSelect
            required
            label="Required Skills"
            placeholder="Select required skills"
            data={skillOptions}
            value={form.skills}
            onChange={(value) => setForm(prev => ({ ...prev, skills: value }))}
            searchable
            classNames={{
              input: 'bg-mine-shaft-800 border-mine-shaft-700 text-white',
              label: 'text-gray-300',
              dropdown: 'bg-mine-shaft-800'
            }}
          />

          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="border-mine-shaft-600 text-gray-300 hover:bg-mine-shaft-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              Post Job
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default CreateJobPage;