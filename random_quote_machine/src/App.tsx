import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { Quote, dangerouslySetInnerHTML } from './types';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.sass';


const App: React.FC = () => {
	const [quote, setQuote] = useState<Quote | null>(null);
	const url: string = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=";

	useEffect(() => {
		getQuote();
	}, [])

	/**
	 * @description API request to https://quotesondesign.com and set Quote using the result
	 */
	async function getQuote(): Promise<void> {
		$.ajax({
			dataType: 'json',
			cache: false,
			url,
			success: (data: Quote[]) => {
				setQuote(data[0])
			}
		});
	}

	/**
	 * @description Return quote's Source if availabe
	 * @param quote 
	 */
	function getSource(quote: Quote | null): dangerouslySetInnerHTML {
		if (quote &&
			typeof quote.custom_meta !== 'undefined' &&
			typeof quote.custom_meta.Source !== 'undefined' &&
			quote.custom_meta.Source) {
			return { __html: quote.custom_meta.Source }
		} else {
			return { __html: '' }
		}
	}

	/**
	 * @description Contruct the url to tweet the Quote
	 * @param quote 
	 */
	function getTwitterUrl(quote: Quote | null): string {
		if (quote) {
			let content = quote.content.replace(/<[^>]*>/g, "");
			return `https://twitter.com/intent/tweet?text=${quote.title}.${content}`
		} else {
			return '';
		}

	}

	return (
		<div className="container">
			<div className="row">
				<div id="quote-box" className="col-md-6 mx-auto box">

					<h3 id="author" dangerouslySetInnerHTML={{ __html: quote ? quote.title : '' }}></h3>

					<p id="text" dangerouslySetInnerHTML={{ __html: quote ? quote.content : '' }}></p>

					<p>
						<cite id="quote-source" dangerouslySetInnerHTML={getSource(quote)}>
						</cite>
					</p>

					<a id="tweet-quote"
						className="twitter-share-button"
						href={getTwitterUrl(quote)}
						target="_blank"
						rel="noopener noreferrer">
						<FontAwesomeIcon icon={faTwitterSquare} />
					</a>

					<button id="new-quote" className="btn" onClick={getQuote}> New Quote</button>
				</div>
			</div>
		</div >
	);
}

export default App;
