require 'sinatra'
require 'goodreads'

def goodreads
  Goodreads::Client.new(api_key: ENV['GOODREADS_KEY'], api_secret: ENV['GOODREADS_SECRET'])
end

def results(query)
  return [] if query.empty?

  search = goodreads.search_books(*query.search_params)

  if search['total_results'].to_i == 0
    []
  else
    search.results.work
  end
end

class SearchQuery
  def initialize(request_params)
    @request_params = request_params
  end

  def search_params
    [q, options]
  end

  def empty?
    q.empty?
  end

  private

  attr_reader :request_params

  def q
    request_params['q'] || ''
  end

  def options
    {
      page: request_params['page'] || 1
    }
  end
end

set :public_folder, File.dirname(__FILE__) + '/dist'

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

get '/books' do
  begin
    content_type :json

    query = SearchQuery.new(params)
    {results: results(query)}.to_json
  end
end

get '/books/:id' do
  begin
    content_type :json
    goodreads.book(params['id']).to_json
  rescue Goodreads::NotFound
    [404, {}.to_json]
  end
end
