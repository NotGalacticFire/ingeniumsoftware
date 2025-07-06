'use client';
import { useState } from 'react';

interface Grant {
  id: string;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  state: string;
  category: string;
  url: string;
}

export default function GrantFinder() {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [filters, setFilters] = useState({
    state: '',
    category: '',
    amount: '',
    search: ''
  });
  const [loading, setLoading] = useState(false);

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const categories = [
    'Small Business', 'Technology', 'Agriculture', 'Healthcare',
    'Education', 'Environment', 'Arts & Culture', 'Research & Development'
  ];

  const searchGrants = async () => {
    setLoading(true);
    try {
      // Mock search for demo - in real app this would call your API
      const mockGrants = [
        {
          id: '1',
          title: 'Small Business Innovation Research (SBIR)',
          description: 'Federal funding program for small businesses to engage in Research and Development with the potential for commercialization.',
          amount: '$50,000 - $1,500,000',
          deadline: '2024-03-15',
          eligibility: ['Small business with <500 employees', 'US-based company', 'R&D focus'],
          state: filters.state || 'National',
          category: 'Technology',
          url: 'https://www.sbir.gov'
        },
        {
          id: '2',
          title: 'State Small Business Credit Initiative',
          description: 'Program designed to strengthen state programs that support lending to small businesses.',
          amount: '$10,000 - $500,000',
          deadline: '2024-04-30',
          eligibility: ['Small business', 'State-specific requirements', 'Good credit history'],
          state: filters.state || 'Various States',
          category: 'Small Business',
          url: '#'
        }
      ];
      
      setTimeout(() => {
        setGrants(mockGrants);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error searching grants:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Search Form */}
      <div style={{
        backgroundColor: 'var(--dark-secondary)',
        padding: '2rem',
        borderRadius: 'var(--border-radius)',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
          Search Grants & Funding
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <select
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem'
            }}
          >
            <option value="">All States</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem'
            }}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={filters.amount}
            onChange={(e) => setFilters({ ...filters, amount: e.target.value })}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem'
            }}
          >
            <option value="">Any Amount</option>
            <option value="0-10000">$0 - $10,000</option>
            <option value="10000-50000">$10,000 - $50,000</option>
            <option value="50000-100000">$50,000 - $100,000</option>
            <option value="100000+">$100,000+</option>
          </select>
          
          <button
            onClick={searchGrants}
            disabled={loading}
            className="cta-button"
            style={{ margin: 0, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Searching...' : 'Search Grants'}
          </button>
        </div>
        
        <input
          type="text"
          placeholder="Search keywords..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'var(--text-primary)',
            fontSize: '0.95rem'
          }}
        />
      </div>

      {/* Results */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {grants.map((grant) => (
          <div key={grant.id} style={{
            backgroundColor: 'var(--dark-secondary)',
            padding: '2rem',
            borderRadius: 'var(--border-radius)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start', 
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <h3 style={{ 
                color: 'var(--text-primary)', 
                fontSize: '1.25rem', 
                margin: 0,
                flex: 1,
                minWidth: '250px'
              }}>
                {grant.title}
              </h3>
              <span style={{
                backgroundColor: '#34c759',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>
                {grant.amount}
              </span>
            </div>
            
            <p style={{ 
              color: 'var(--text-secondary)', 
              marginBottom: '1.5rem',
              lineHeight: 1.6
            }}>
              {grant.description}
            </p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem', 
              marginBottom: '1.5rem' 
            }}>
              <div>
                <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Deadline:</span>
                <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                  {grant.deadline}
                </span>
              </div>
              <div>
                <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>State:</span>
                <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                  {grant.state}
                </span>
              </div>
              <div>
                <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Category:</span>
                <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                  {grant.category}
                </span>
              </div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Eligibility:</span>
              <ul style={{ 
                listStyle: 'disc',
                listStylePosition: 'inside',
                color: 'var(--text-secondary)',
                marginTop: '0.5rem',
                paddingLeft: '1rem'
              }}>
                {grant.eligibility.map((req, index) => (
                  <li key={index} style={{ marginBottom: '0.25rem' }}>{req}</li>
                ))}
              </ul>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={grant.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
                style={{ margin: 0, textDecoration: 'none' }}
              >
                View Details
              </a>
              <button style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}>
                Save Grant
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {grants.length === 0 && !loading && (
        <div style={{
          backgroundColor: 'var(--dark-secondary)',
          padding: '3rem',
          borderRadius: 'var(--border-radius)',
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
            No grants found. Try adjusting your search criteria.
          </p>
          <p style={{ fontSize: '0.9rem' }}>
            Use the search form above to find grants and funding opportunities specific to your business.
          </p>
        </div>
      )}

      {loading && (
        <div style={{
          backgroundColor: 'var(--dark-secondary)',
          padding: '3rem',
          borderRadius: 'var(--border-radius)',
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          <p>Searching for grants...</p>
        </div>
      )}
    </div>
  );
}
